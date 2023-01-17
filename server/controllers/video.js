const mongoose = require('mongoose');
const fs = require('fs');

const Video = require('../models/Video');
const methods = require('../db/methods');
const chunkSize = 102400;

exports.getVideoThumbnail = (req, res, next) => {
    console.log("Thumb");
    res.setHeader('Content-Type', 'image/*');
    res.setHeader('Content-Disposition', 'attachment');
    const thumbnails = methods.getGridBucket('thumbnails');
    thumbnails
        .openDownloadStream(mongoose.Types.ObjectId(req.query.videoId))
        .pipe(res);
};

exports.getUserVideoInfo = async (req, res, next) => {
    let userVideos = await Video.find({
        author: mongoose.Types.ObjectId(req.query.userId),
    });

    if (req.query.videoId)
        userVideos = await userVideos
            .where('_id')
            .equals(mongoose.Types.ObjectId(req.query.videoId));
    
    /*methods
        .downloadFile(mongoose.Types.ObjectId(userVideos[0].thumbnail), 'thumbnails', chunkSize,)
        .pipe(res);*/

    if (!userVideos){
        res.status(201).json({ message: 'There are no user videos.', videos: {}});
    }

    res.status(200).json({ videos: userVideos });
};

exports.postVideo = (req, res, next) => {
    const video = { ...req.files['video'][0] };
    const videoFileId = video.id;
    const thumbnail = { ...req.files['thumbnail'][0] };
    const thumbnailFileId = thumbnail.id;
    const message = [];

    const mongoVideo = new Video({
        title: req.body.title,
        description: req.body.description,
        author: mongoose.Types.ObjectId(req.body.userId),
        thumbnail: thumbnailFileId,
        likes: 0,
        dislikes: 0,
        file: videoFileId,
        length: video.size
    });

    mongoVideo
        .save()
        .then((result) => {
            message.push('Video has been uploaded successfully.');
            res.status(201).json({ message: message.join("\r\n") });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
};