const express = require('express');
const generateRandomToken = require('../utils/login.utils');
const { validadeEmail, validadePassword } = require('../middlewares/login.middlewares');

const router = express.Router();

// Rota: POST /login
router.post('/', validadeEmail, validadePassword, (_req, res) => {
  const token = generateRandomToken(16);
  res.status(200).json({ token });
});

module.exports = router;