const express = require('express');
const router = express.Router();
const { getExamResults } = require('../controllers/resultController');
const auth = require('../middlewares/auth');

router.get('/', auth(['member','admin']), getExamResults);

module.exports = router;