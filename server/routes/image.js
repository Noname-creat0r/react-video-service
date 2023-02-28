const express = require('express');
const storage = require('../db/storage');

const imageController = require('../controllers/image');
const router = express.Router();

router.get(
    '/thumbnail:id?',
    imageController.getThumbnail
);

router.get(
    '/avatar:id?',
    imageController.getAvatar,
)

module.exports = router;