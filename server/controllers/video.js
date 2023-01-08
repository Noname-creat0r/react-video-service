const mongoose = require('mongoose');
const GridFS = require('mongoose-gridfs');
const fs = require('fs');
const path = require('path');

const Video = require('../models/Video');
const dbConfig= require('../db/config');
const { assert } = require('console');

exports.getVideo = (req, res, next) => {

};

exports.postVideo = (req, res, next) => {
        const video = {...req.files['video'][0]};
        const videoFilePath = video.originalname;
        const _id = new mongoose.Types.ObjectId();

        const gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'videos',
        });

        fs
            .createReadStream(videoFilePath)
            .pipe(gridfs.openUploadStreamWithId(_id, videoFilePath))
            .on('error', (error) => {
                console.log(error);
            })
            .on('finish', (result) => {
                console.log(result);
                console.log('done');
                //process.exit(0);
            });
       /* const bucket = GridFS.createBucket();
        console.log(video.buffer);
        const filename = video.originalname;
        const writeStream = fs.createWriteStream(filename);
        const readStream = bucket.createReadStream({_id, filename});
        readStream.pipe(writeStream);*/
        //const Video = GridFS.createModel();

};