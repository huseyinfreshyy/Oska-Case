const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/', downloadController.downloadFile, authMiddleware.verifyToken)

module.exports = router;