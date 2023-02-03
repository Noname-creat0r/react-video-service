const express = require('express');
const {body} = require('express-validator');

const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

router.get(
    '/get',
    isAuth,
    userController.fetchData
);

router.get(
    '/playlist',
    isAuth,
    userController.getPlaylist
)

router.post(
    '/playlist',
    isAuth,
    userController.postPlaylist
)

module.exports = router;