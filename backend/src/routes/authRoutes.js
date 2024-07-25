const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const {createMember} = require('../controllers/memberController');
const { validateRegister, validateLogin } = require('../validations/authValidation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.post('/register-member', auth('admin'), validateRegister, createMember);

module.exports = router;
