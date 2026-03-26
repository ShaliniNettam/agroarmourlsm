const DiseaseDetection = require('../models/diseaseDetection.model');

// Save a new disease detection result
const saveDetection = async (req, res) => {
  try {
    const { imageUrl, disease, confidence, allPredictions, recommendation, notes } = req.body;

    if (!imageUrl || !disease || confidence === undefined) {
      return res.status(400).json({ error: 'Missing required detection data' });
    }

    const detection = new DiseaseDetection({
      userId: req.user._id,
      imageUrl,
      disease,
      confidence,
      allPredictions,
      recommendation,
      notes
    });

    await detection.save();

    res.status(201).json({
      message: 'Detection result saved successfully',
      detection
    });
  } catch (error) {
    console.error('Save detection error:', error);
    res.status(500).json({ error: 'Failed to save detection result' });
  }
};

// Get detection history for the current user
const getHistory = async (req, res) => {
  try {
    const history = await DiseaseDetection.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ history });
  } catch (error) {
    console.error('Get detection history error:', error);
    res.status(500).json({ error: 'Failed to get detection history' });
  }
};

// Get a single detection by ID
const getDetectionById = async (req, res) => {
  try {
    const detection = await DiseaseDetection.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!detection) {
      return res.status(404).json({ error: 'Detection result not found' });
    }

    res.json({ detection });
  } catch (error) {
    console.error('Get detection error:', error);
    res.status(500).json({ error: 'Failed to get detection result' });
  }
};

// Update notes for a detection
const updateNotes = async (req, res) => {
  try {
    const { notes, status } = req.body;
    
    const detection = await DiseaseDetection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { notes, status } },
      { new: true }
    );

    if (!detection) {
      return res.status(404).json({ error: 'Detection result not found' });
    }

    res.json({ 
      message: 'Detection updated successfully',
      detection 
    });
  } catch (error) {
    console.error('Update detection error:', error);
    res.status(500).json({ error: 'Failed to update detection result' });
  }
};

module.exports = {
  saveDetection,
  getHistory,
  getDetectionById,
  updateNotes
};
