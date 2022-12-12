const express = require('express');
const {body} = require('express-validator');

const User = require('../models/User');
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

const log = () => {console.log("Lol");}


router.get(
    '/get',
    isAuth,
    userController.fetchData
);

module.exports = router;