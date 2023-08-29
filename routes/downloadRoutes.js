const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/verify', authMiddleware.verifyToken);
router.post('/', downloadController.downloadFile)

module.exports = router;