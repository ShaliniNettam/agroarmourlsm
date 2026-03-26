const express = require('express');
const router = express.Router();
const controller = require('../controllers/diseaseDetection.controller');
const { auth } = require('../middleware/auth');

// All detection routes are protected
router.use(auth);

router.post('/', controller.saveDetection);
router.get('/history', controller.getHistory);
router.get('/:id', controller.getDetectionById);
router.patch('/:id/notes', controller.updateNotes);

module.exports = router;
