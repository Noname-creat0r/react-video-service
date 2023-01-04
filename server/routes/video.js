const express = require('express');
const {body} = require('express-validator');

const videoController = require('../controllers/video');
const router = express.Router();

router.post(
    '/',
    videoController.postVideo
)

router.get(
    '/:id',
    videoController.getVideo
)

module.exports = router;