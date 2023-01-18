const mongoose = require('mongoose');
const fs = require('fs');

const Video = require('../models/Video');
const Thumbnail = require('../models/Thumbnail');
const methods = require('../db/methods');

exports.getVideoThumbnail = async (req, res, next) => {
    console.log("Thumb");
    const thumbnails = methods.getGridBucket('thumbnails'); 
    thumbnails
        .find({ _id: mongoose.Types.ObjectId(req.query.videoId) })
        .forEach(thumbnail => {
            res.setHeader('Content-Type', thumbnail.contentType);
            res.setHeader('Content-Disposition', 'attachment');
            //res.setHeader('Content-Transfer-Encoding', 'base64');
            const downloadStream = thumbnails.openDownloadStreamByName(thumbnail.filename);
            
            downloadStream.on('data', data => {
                return res.status(200).write(data);
            });
           
            downloadStream.on('error', err => {
                return res.status(404).json({ message: 'Cannot get the image.' });
            })

            downloadStream.on('end', () => {
                return res.end();
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
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

    /*console.log(thumbnail.toString('base64'));
    const thumbnailData = fs.readFileSync(thumbnail.path);
    const mongoThumbnail = new Thumbnail({
        data: thumbnailData.toString('base64'),
        contentType: thumbnail.mimetype,
    });*/

    mongoVideo
        .save()
        .then(result => {
            message.push('Video has been uploaded successfully.');
            res.status(201).json({ message: message.join("\r\n") });
            //return mongoThumbnail.save();
        })
        /*.then(result => {
            message.push('Thumbnail has been uploaded successfully.');
            res.status(201).json({ message: message.join("\r\n") });
        })*/
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
};