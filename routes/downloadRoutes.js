const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verifyToken);
router.post('/download', downloadController.downloadFile ,authMiddleware.verifyToken)

module.exports = router;