const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
router.get('/', authMiddleware.createToken)

module.exports = router;