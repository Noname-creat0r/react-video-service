const express = require('express');
//const { body } = require('express-validator');

const User = require('../models/User');
const storage = require('../db/storage');
const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/signup',
    storage.upload.single('avatar'),
    authController.signup
)

router.post('/signin', authController.signin);

module.exports = router;