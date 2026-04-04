const User = require('../models/user.model');
const { generateToken } = require('../middleware/auth');
const hubspotService = require('../services/hubspotService');

// Register new user
const register = async (req, res) => {
  try {
    const { phone, email, password, name } = req.body;

    // Validate input
    if (!phone || !name || !password) {
      return res.status(400).json({ error: 'Phone, name and password are required' });
    }

    // Check if user already exists by phone or email
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      const field = existingUser.phone === phone ? 'phone number' : 'email';
      return res.status(400).json({ error: `User already exists with this ${field}` });
    }

    // Create new user
    const user = new User({
      phone,
      email: email || undefined,
      pwdHash: password,
      name
    });

    await user.save();

    // Sync new user to HubSpot CRM (fire-and-forget)
    hubspotService.syncContact({ email, name, phone }).catch(err =>
      console.error('HubSpot sync error (register):', err)
    );

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        photo: user.photo,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB duplicate key error code 11000
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ error: `Already registered: ${field} in use.` });
    }

    res.status(500).json({ error: 'Registration failed: Internal Server Error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { phone, email, password } = req.body;

    // Find user by phone or email
    const user = await User.findOne({ $or: [{ phone }, { email }] });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    if (!password || !user.pwdHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Track login event in HubSpot (fire-and-forget)
    hubspotService.trackEvent(user.email, 'pe_login', {
      phone: user.phone,
      login_time: new Date().toISOString()
    }).catch(err =>
      console.error('HubSpot track error (login):', err)
    );

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        photo: user.photo,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        phone: req.user.phone,
        email: req.user.email,
        name: req.user.name,
        photo: req.user.photo,
        preferences: req.user.preferences
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

// Update user preferences
const updatePreferences = async (req, res) => {
  try {
    const { voiceEnabled, notificationsEnabled, voiceLanguage } = req.body;

    const updateData = {};
    if (voiceEnabled !== undefined) updateData['preferences.voiceEnabled'] = voiceEnabled;
    if (notificationsEnabled !== undefined) updateData['preferences.notificationsEnabled'] = notificationsEnabled;
    if (voiceLanguage !== undefined) updateData['preferences.voiceLanguage'] = voiceLanguage;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    );

    res.json({
      message: 'Preferences updated successfully',
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        photo: user.photo,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

// Update user profile (name, email, photo)
const updateProfile = async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    
    // Check if email belongs to another user
    if (email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (photo) updateData.photo = photo;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        photo: user.photo,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.pwdHash = newPassword; // Will be hashed by pre-save middleware
    await user.save();

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  updatePreferences,
  changePassword
};
