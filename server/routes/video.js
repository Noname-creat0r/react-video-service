const express = require('express');
const {body} = require('express-validator');

const videoController = require('../controllers/video');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

//const videoUploadFiles = upload.fields([{ name: 'thumbnail'}, { name: 'video'}]);

router.post(
    '/',
    isAuth,
    videoController.postVideo
)

router.get(
    '/info:id',
    videoController.getVideoInfo
)


module.exports = router;