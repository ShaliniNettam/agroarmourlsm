const Post = require('../models/community.model');

// @desc    Get all community posts (with optional category filter)
// @route   GET /api/community
// @access  Private
exports.getPosts = async (req, res) => {
  try {
    const { category, type } = req.query; // type can be 'latest' or 'active'
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 }) // Default: Latest
      .limit(50); // Limit to 50 for performance

    // Manual sort for 'active' (most comments + likes)
    if (type === 'active') {
      posts.sort((a, b) => {
        const scoreA = a.comments.length * 2 + a.likes.length;
        const scoreB = b.comments.length * 2 + b.likes.length;
        return scoreB - scoreA;
      });
    }

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching community posts:', error);
    res.status(500).json({ success: false, message: 'Server error fetching posts' });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/community/:id
// @access  Private
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ success: false, message: 'Server error fetching post' });
  }
};

// @desc    Create a new community post
// @route   POST /api/community
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { text, category, image } = req.body;

    if (!text || !category) {
      return res.status(400).json({ success: false, message: 'Please provide text and category' });
    }

    const post = await Post.create({
      userId: req.user._id,
      userName: req.user.name || `${req.user.firstName} ${req.user.lastName}`, // Handle varying user models
      category,
      text,
      image: image || null
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, message: 'Server error creating post' });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/community/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = {
      userId: req.user._id,
      userName: req.user.name || `${req.user.firstName} ${req.user.lastName}`,
      text
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Server error adding comment' });
  }
};

// @desc    Toggle Helpful (Like) on a post
// @route   PUT /api/community/:id/like
// @access  Private
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if user already liked
    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Report a post
// @route   PUT /api/community/:id/report
// @access  Private
exports.reportPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (!post.reports.includes(req.user._id)) {
      post.reports.push(req.user._id);
      await post.save();
    }

    res.status(200).json({ success: true, message: 'Post reported' });
  } catch (error) {
    console.error('Error reporting post:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/community/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'User not authorized to delete this post' });
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, message: 'Server error deleting post' });
  }
};
