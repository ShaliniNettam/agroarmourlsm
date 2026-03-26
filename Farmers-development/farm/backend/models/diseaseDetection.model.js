const mongoose = require('mongoose');

const diseaseDetectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  allPredictions: {
    type: Map,
    of: Number
  },
  recommendation: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Resolved'],
    default: 'Pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient user history queries
diseaseDetectionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('DiseaseDetection', diseaseDetectionSchema);
