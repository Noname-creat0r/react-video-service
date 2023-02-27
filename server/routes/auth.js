const express = require('express');
//const { body } = require('express-validator');

const User = require('../models/User');
const storage = require('../db/storage');
const authController = require('../controllers/auth');

const router = express.Router();

/* [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, {req}) =>{
                return User.findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject("This email address have been already registered")
                        }
                    });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 5}),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ], */


router.post(
    '/signup',
    storage.upload.single('avatar'),
    authController.signup
)

router.post('/signin', authController.signin);

module.exports = router;