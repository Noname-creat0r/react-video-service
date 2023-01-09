const mongoose = require('mongoose');
const GridFS = require('mongoose-gridfs');
const fs = require('fs');

const Video = require('../models/Video');
const chunkSize = 10240;
const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'videos',
    chunkSizeBytes: chunkSize,
});

exports.getVideo = (req, res, next) => {

};

exports.postVideo = (req, res, next) => {
    // delete file from (/public/tmp) afterwards
    const video = { ...req.files['video'][0] };
    const videoFileName = video.filename;
    const videoFilePath = video.path;
    const fileId = new mongoose.Types.ObjectId();
    
    fs
        .createReadStream(videoFilePath)
        .pipe(bucket.openUploadStreamWithId(fileId, videoFileName, { 
            chunkSizeBytes: chunkSize
        }))
        .on('error', (error) => {
            console.log(error);
        })
        .on('finish', (result) => {
            console.log(result);
            console.log('done');

            const mongoVideo = new Video({
                title: video.title,
                description: video.description,
                author: mongoose.Types.ObjectId(req.body.userId),
                file: fileId,
                length: video.size
            });
            mongoVideo
                .save()
                .then((result) => {
                    res.status(201).json({ message: 'Video has been uploaded' });
                })
                .catch(err => {
                    if (!err.statusCode){
                        err.statusCode = 500;
                    }
                    next(err);
                });

            //const cursor = bucket.find({});
            //cursor.forEach(file => console.log(file));
        })
};