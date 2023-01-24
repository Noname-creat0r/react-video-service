const express = require('express');
const {body} = require('express-validator');
const storage = require('../db/storage');

const videoController = require('../controllers/video');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
    '/', 
    isAuth,
    storage.upload.fields([ {name: 'video', maxCount: 1} ,
        {name: 'thumbnail', maxCount: 1}]),
    videoController.postVideo
);

router.get(
    '/info:userId?',
    videoController.getUserVideoInfo
);

router.get(
    '/thumbnail:id?',
    videoController.getVideoThumbnail
)

router.get(
    ':id?',
    videoController.getVideo
)

module.exports = router;