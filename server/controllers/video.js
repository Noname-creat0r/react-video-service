const mongoose = require('mongoose');
const fs = require('fs');

const Video = require('../models/Video');
const Thumbnail = require('../models/Thumbnail');
const methods = require('../db/methods');

exports.getVideoThumbnail = async (req, res, next) => {
    console.log(req.query.id + " thumbnail id");
    const thumbnails = methods.getGridBucket('thumbnails'); 
    thumbnails
        .find({ _id: mongoose.Types.ObjectId(req.query.id) })
        .forEach(thumbnail => {
            res.setHeader('Content-Type', thumbnail.contentType);
            res.setHeader('Content-Disposition', 'attachment');

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
            .equals(mongoose.Types.ObjectId(req.query.videoId))
            .limit(5);
    
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

exports.getVideo = (req, res, next) => {
    try {
        const range = req.headers.range;
        if (!range){
            const error = new Error('Requires Range header.');
            error.statusCode = 400;
            throw error;
        }

        const video =  Video
            .find({ _id: mongoose.Types.ObjectId(req.query.id)})
            .then( video => {
                if (!video){
                    const error = new Error('No such video.');
                    error.statusCode = 404;
                    throw error;
                }
                //console.log(video[0].file.toString());
                return video[0].file;
            })
            .then( videoFileId => {
                return methods
                    .getGridBucket('videos')
                    .find({ _id: videoFileId})
                    .next() 
            })
            .then( file => {
                if (!file){
                    const error = new Error('No such video file.');
                    error.statusCode = 500;
                    throw error;
                }
                //file.forEach(file => {console.log (file)});
                //console.log(file.length);

                const videoSize = file.length;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + 10**6, videoSize - 1);
                const contentLength = end - start + 1; 
                console.log("start: " + start + " end: " + end);
                //console.log(videoSize);
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": file.contentType,
                } 
                
                res.writeHead(206, headers);
               
                methods
                    .getGridBucket('videos')
                    .openDownloadStreamByName(
                        file.filename,
                        {start: start, end: end})
                    .pipe(res);
            })

    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};