const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  getPost, 
  createPost, 
  addComment, 
  toggleLike, 
  reportPost,
  deletePost
} = require('../controllers/community.controller');
const { auth } = require('../middleware/auth');

// All community routes require authentication
router.use(auth);

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .get(getPost)
  .delete(deletePost);

router.route('/:id/comments')
  .post(addComment);

router.route('/:id/like')
  .put(toggleLike);

router.route('/:id/report')
  .put(reportPost);

module.exports = router;
