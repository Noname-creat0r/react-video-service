const express = require('express');
const {body} = require('express-validator');

const videoController = require('../controllers/video');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post(
    '/',
    isAuth,
    videoController.postVideo
);

router.get(
    '/info:userId?',
    videoController.getUserVideoInfo
);

router.get(
    '/thumbnail:videoId?',
    videoController.getVideoThumbnail
)


module.exports = router;