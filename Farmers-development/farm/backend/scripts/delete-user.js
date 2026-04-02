const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const User = require('../models/user.model');
const dns = require('dns');

// Override DNS to bypass SRV lookup failures in restricted networks
dns.setServers(['8.8.8.8', '8.8.4.4']);

const deleteUser = async (phone) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'farm-management' });
    const result = await User.deleteOne({ phone });
    if (result.deletedCount > 0) {
      console.log(`✅ User with phone ${phone} deleted successfully. You can now sign up again with this number.`);
    } else {
      console.log(`❌ User with phone ${phone} not found.`);
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    process.exit(1);
  }
};

deleteUser('7989303343');
