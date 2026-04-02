const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  likes: [{ // Array of user IDs who liked the comment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Poultry', 'Dairy', 'Fish'],
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // String URL or base64 representation
    default: null
  },
  likes: [{ // Array of user IDs who found the post helpful
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reports: [{ // Array of user IDs who reported the post
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [commentSchema]
}, { timestamps: true });

const Post = mongoose.model('CommunityPost', postSchema);

module.exports = Post;
