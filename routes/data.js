const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/data');

router.get('/', getAll);

module.exports = router;