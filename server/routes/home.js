const express = require('express');
const {body} = require('express-validator');

const homeController = require('../controllers/home');

const router = express.Router();

router.get(
    '/',
    homeController.fetchHome
);

module.exports = router;