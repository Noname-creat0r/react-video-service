const mongoose = require('mongoose');

const Video = require('../models/Video');
const User = require('../models/User');
const Like = require('../models/Like');
const Dislike = require('../models/Dislike');
const Commentary = require('../models/Commentary');
const methods = require('../db/methods');
const { insertAuthorNames, handleLikeDislike, 
    updateVideoLikes, updateVideoDislikes, sortByUploadDate } = require('../shared/utility');

exports.getVideoThumbnail = async (req, res, next) => {
    //console.log(req.query.id + " thumbnail id");
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

exports.getVideosInfoByUserId = async (req, res, next) => {
    const info = [];
    if (req.query.userId){
        const author = await User.findOne({
            _id: mongoose.Types.ObjectId(req.query.userId)
        });
        const videos = await Video
            .find({ author: mongoose.Types.ObjectId(req.query.userId) })
            .lean();
        for (const video of videos){
            info.push({ ...video, authorName: author.name} );
        }
    } 
    res.status(200).json({ videos: info });
};

exports.getVideoInfoById = async (req, res, next) => {
    let video = [];
    if (req.query.videoId){
        video = await Video
            .findOne({
                _id: mongoose.Types.ObjectId(req.query.videoId)
            })
            .lean();
        video = await insertAuthorNames([video]);
        //console.log(video);
    }
    res.status(200).json({ videos: video });
}

exports.getFilterVideoInfo = async (req, res, next) => {
    const videoName = req.query.videoName;
    //console.log(req.query);
    let videos = await Video
        .find({ title: { $regex: videoName, $options: 'i'}  })
        .lean();
    const filters = req.query.filters;
    if (filters)
        videos = videos.sort((videoA, videoB) => {
            if ( videoA.createdAt > videoB.createdAt) return -1; 
            if ( videoA.createdAt < videoB.createdAt) return 1;
            return 0;
        });
    videos = await insertAuthorNames(videos);

    res.status(200).json({ videos: videos});
}

exports.getHomeVideoInfo = async (req, res, next) => {
    let info = await Video
        .find({ })
        .lean();

    info = await insertAuthorNames(info);
    res.status(200).json({ videos: info });
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
        views: 0,
        file: videoFileId,
        length: video.size
    });

    mongoVideo
        .save()
        .then(result => {
            message.push('Video has been uploaded successfully.');
            res.status(201).json({ 
                video: result.toObject(),
                message: message.join("\r\n") });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.getVideo = (req, res, next) => {
    try {

        const video = Video
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

                const videoSize = file.length;
                const range = req.headers.range;
                /*if (!range){
                    const error = new Error('Requires Range header.');
                    error.statusCode = 400;
                    throw error;
                }*/
                if (range) {
                    res.writeHead(200, {
                        "Connection": "close",
                        "Content-Length": videoSize,
                        "Content-Type": file.contentType,
                    })
                    methods
                        .getGridBucket('videos')
                        .openDownloadStreamByName(file.filename)
                        .pipe(res);

                } else {

                    //const CHUNK_SIZE = 261120;
                    const parts = range.replace(/bytes=/, "").split("-")
                    const start = parseInt(parts[0], 10)
                    const end = parts[1] ? parseInt(parts[1], 10): videoSize-1
                    const contentLength = (end - start) + 1; 
                    console.log("start: " + start + ", end: " + end + ', videoSize: ' + videoSize);
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
                    
                }
            })

    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postComment = async (req, res, next) => {
    try {
        const newComment = new Commentary({
            author: mongoose.Types.ObjectId(req.body.userId),
            video: mongoose.Types.ObjectId(req.body.videoId),
            text: req.body.text,
            likes: 0,
            dislikes: 0,
        });

        await newComment.save();
        const postedComment = await insertAuthorNames([newComment.toObject()]);
        //console.log(postedComment);
        res.status(201).json({ 
            message: 'Posted a comment',
            comment: postedComment
        });
    } catch (err) {
        //console.log(err);
        next(err);
    } 
};

exports.getComments = async (req, res, next) => {
    try {
        let comments = await Commentary
            .find({
                video: mongoose.Types.ObjectId(req.query.videoId),
            })
            .lean();

        comments = sortByUploadDate(comments);
        comments = await insertAuthorNames(comments);
        //console.log(comments);
        res.status(201).json({ comments: comments });
    } catch(err) {
        //console.log(err);
        next(err);
    }
};

exports.likeVideo = async (req, res, next) => {
    try {
        const result = await handleLikeDislike(Like, req);
        let updatedVideo = await updateVideoLikes(req.body.videoId, req.body.userId, result.action);
        updatedVideo = await insertAuthorNames([updatedVideo]);
       //console.log(updatedVideo);
        res.status(200).json({ video: updatedVideo });
    } catch(err) {
        //console.log(err);
        next(err);
    }
};

exports.dislikeVideo = async (req, res, next) => {
    try {
        const result = await handleLikeDislike(Dislike, req);
        let updatedVideo = await updateVideoDislikes(req.body.videoId, req.body.userId, result.action);
        updatedVideo = await insertAuthorNames([updatedVideo]);
        //console.log(updatedVideo);
        res.status(200).json({ video: updatedVideo });
    } catch(err) {
        //console.log(err);
        next(err);
    }
};

exports.postView = async (req, res, next) => {
    try {
        const videoId = req.body.videoId;
        if (!videoId){
            const error = new Error('Missing videoId in body.');
            error.statusCode = 400;
            throw error;
        }

        const video = await Video.findOne({
            _id: mongoose.Types.ObjectId(videoId)
        })
        video.$inc('views', 1);
        await video.save();

        res.status(200).json({
            message: 'Viewed a video.'  
        })

    } catch (err) {
        next(err);
    }
};