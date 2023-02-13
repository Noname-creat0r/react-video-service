const User = require('../models/User');
const Video = require('../models/Video');
const Like = require('../models/Like');
const Dislike = require('../models/Dislike');
const Playlist = require('../models/Playlist');
const mongoose = require('mongoose');

exports.updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

exports.insertAuthorNames = async (videoInfoArr) => {
    const infoArrWithAuthors = [];
    for (const videoInfo of videoInfoArr){
        const author = await User.findOne({
            _id: mongoose.Types.ObjectId(videoInfo.author)
        });
        infoArrWithAuthors.push( this.updateObject(videoInfo, {
            authorName: author.name
        }));
    };
    return infoArrWithAuthors;
};

exports.handleLikeDislike = async (model, req) => {
    const author = mongoose.Types.ObjectId(req.body.userId);
    const video = mongoose.Types.ObjectId(req.body.videoId);
    let action = '';

    const isRated = await model
        .findOne({
            author: author,
            video:  video,
        });

    if (!isRated){
        action = 'added';
        const newInstance = new model({
            author: author,
            video:  video
        });
        await newInstance.save();
    } 
    else {
        action = 'removed';
        await isRated.remove();
    }

    return {
        model: model.modelName,
        action: action,
    };
};


exports.updateVideoLikes = async (video, author, action) => {
    const videoId = mongoose.Types.ObjectId(video);
    const authorId = mongoose.Types.ObjectId(author);

    const isDisliked = await Dislike.findOne({
        author: authorId,
        video: videoId
    });

    const videoDoc = await Video.findOne({
        _id: videoId
   });

    if (isDisliked){
        await isDisliked.remove();
        videoDoc.$inc('dislikes', -1);
    }

    videoDoc.$inc('likes', action === 'added' ? 1 : -1);
    await videoDoc.save();
    return videoDoc.toObject();
};

exports.updateVideoDislikes = async (video, author, action) => {
    const videoId = mongoose.Types.ObjectId(video);
    const authorId = mongoose.Types.ObjectId(author);

    const videoDoc = await Video.findOne({
        _id: videoId,
    })

    const isLiked = await Like.findOne({
        author: authorId,
        video: videoId
    });

    if (isLiked){
        await isLiked.remove();
        videoDoc.$inc('likes', -1);
    }
   
    videoDoc.$inc('dislikes', action === 'added' ? 1 : -1);
    await videoDoc.save();
    return videoDoc.toObject();
};

exports.sortByUploadDate = (docsArr, asc) => {
    return docsArr.sort((docA, docB) => {
        if ( docA.createdAt > docB.createdAt) return asc ? 1 : -1; 
        if ( docA.createdAt < docB.createdAt) return asc ? -1: 1;
        return 0;
    });
};

exports.insertVideoInfoInPlaylist = async (playlistDoc) => {
    const updatedPlaylist = {...playlistDoc};
    updatedPlaylist.videos = [];
    for (const videoRef of playlistDoc.videos) {
        const id = mongoose.Types.ObjectId(videoRef._id);
        const videoInfo = await Video.findOne({
            _id: id
        }).lean();
        updatedPlaylist.videos.push(videoInfo);
    }
    //console.log(updatedPlaylist);
    return updatedPlaylist;
};