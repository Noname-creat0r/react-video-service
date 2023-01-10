const mongoose = require('mongoose');
const fs = require('fs');

const Video = require('../models/Video');
const methods = require('../db/methods');
const chunkSize = 102400;

exports.getVideoInfo = (req, res, next) => {

};

exports.postVideo = (req, res, next) => {
    // delete file from (/public/tmp) afterwards
    // upload thumbnail
    /*const video = { ...req.files['video'][0] };
    const videoFileName = video.filename;
    const videoFilePath = video.path;
    const fileId = new mongoose.Types.ObjectId();
    const chunkSize = 10240;

    const thumbnail = { ...req.files['thumbnail'][0] };
    const thumbnailFileName = thumbnail

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'videos',
        chunkSizeBytes: chunkSize,
    });*/
    const video = { ...req.files['video'][0] };
    const videoFileId = new mongoose.Types.ObjectId();
    const thumbnail = { ...req.files['thumbnail'][0] };
    const thumbnailFileId = new mongoose.Types.ObjectId();
    const message = [];

    methods
        .uploadFile(thumbnail, 'thumbnails', chunkSize, thumbnailFileId)
        .on('finish', (result) => {
            message.push('Thumnail has been uploaded successfully.');
        });
    
    methods
        .uploadFile(video, 'videos', chunkSize, videoFileId)
        .on('finish', (result) => {
            console.log(result);
            console.log('done');

            const mongoVideo = new Video({
                title: req.body.title,
                description: req.body.description,
                author: mongoose.Types.ObjectId(req.body.userId),
                thumbnail: thumbnailFileId,
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
            });
    
};