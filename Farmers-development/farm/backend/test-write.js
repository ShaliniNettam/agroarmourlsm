const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const testWrite = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'farm-management' });
    console.log("✅ Connected for write test");
    
    // Create a temporary collection to test write
    const TempSchema = new mongoose.Schema({ name: String, createdAt: Date });
    const TempModel = mongoose.model('ConnectionTest', TempSchema);
    
    const testDoc = new TempModel({ name: 'Connection Test ' + new Date().toISOString(), createdAt: new Date() });
    await testDoc.save();
    console.log("✅ Write successful: Document saved");
    
    await TempModel.deleteOne({ _id: testDoc._id });
    console.log("✅ Cleanup: Document deleted");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Write test failed:", err);
    process.exit(1);
  }
};

testWrite();
