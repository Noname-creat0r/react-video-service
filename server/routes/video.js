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

router.post(
    '/category',
    //isAuth, //isAdmin - future
    videoController.postCategory,
)

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
    '/categories',
    videoController.getCategories,
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

/*router.get(
    '/thumbnail:id?',
    videoController.getVideoThumbnail
);*/

router.get(
    ':id?',
    videoController.getVideo
);

module.exports = router;