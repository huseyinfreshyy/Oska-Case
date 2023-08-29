// routes/downloadRoutes.js
const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/download', authMiddleware.verifyToken, downloadController.downloadFile);

module.exports = router;
