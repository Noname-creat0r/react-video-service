const express = require('express');
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

router.post(
    '/view',
    videoController.postView,
)

router.post(
    '/comment',
    isAuth,
    videoController.postComment,
);

router.post(
    '/like',
    isAuth,
    videoController.likeVideo
);

router.post(
    '/dislike',
    isAuth,
    videoController.dislikeVideo
);

router.get(
    '/comment:videoId?',
    videoController.getComments,
);

router.get(
    '/info:userId?',
    videoController.getVideosInfoByUserId
);

router.get(
    '/info/one:videoId?',
    videoController.getVideoInfoById
);


router.get(
    '/info/filter',
    videoController.getFilterVideoInfo
);

router.get(
    '/info/home',
    videoController.getHomeVideoInfo
);

router.get(
    ':id?',
    videoController.getVideo
);

module.exports = router;