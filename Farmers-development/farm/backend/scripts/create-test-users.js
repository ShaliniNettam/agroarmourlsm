const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const User = require('../models/user.model');
const dns = require('dns');

// Override DNS to bypass SRV lookup failures in restricted networks
dns.setServers(['8.8.8.8', '8.8.4.4']);

const createTestUsers = async (count = 1000) => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'farm-management' });
    console.log('✅ Connected to MongoDB.');

    console.log(`🚀 Starting creation of ${count} test users...`);
    
    const existingCount = await User.countDocuments();
    console.log(`📊 Current user count: ${existingCount}`);

    const basePhone = 9000000000;
    const users = [];

    for (let i = 0; i < count; i++) {
      const phone = (basePhone + i).toString();
      const email = `testuser${i}@agroarmor.com`;
      
      // Check if this specific test user already exists to avoid 11000 errors
      const exists = await User.findOne({ $or: [{ phone }, { email }] });
      if (!exists) {
        users.push({
          phone,
          email,
          pwdHash: 'password123', // Will be hashed by pre-save hook
          name: `AgroArmor Farmer ${i + 1}`,
          preferences: {
            voiceEnabled: true,
            notificationsEnabled: true,
            voiceLanguage: 'en-US'
          }
        });
      }

      // Insert in batches of 100 for efficiency
      if (users.length >= 100 || (i === count - 1 && users.length > 0)) {
        await User.insertMany(users);
        console.log(`✅ Created ${i + 1} users...`);
        users.length = 0; // Clear the array
      }
    }

    const finalCount = await User.countDocuments();
    console.log(`🎯 Finished! Total users in database: ${finalCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test users:', error);
    process.exit(1);
  }
};

createTestUsers(1000);
