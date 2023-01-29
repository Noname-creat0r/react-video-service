const User = require('../models/User');
const Video = require('../models/Video');
const mongoose = require('mongoose');
const { listenerCount } = require('../models/Dislike');

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

    const isLiked = await model
        .findOne({
            author: author,
            video:  video,
        })
        .exec();
    if (!isLiked){
        action = 'added';
        const newInstance = new model({
            author: author,
            video:  video
        });
        await newInstance.save();
    } 
    else {
        action = 'removed';
        await model.deleteOne({
            author: author,
            video:  video
        });
    }

    return {
        model: model.modelName,
        action: action,
    };
};


exports.updateVideoLikes = async (id, action) => {
    const videoId = mongoose.Types.ObjectId(id);
    console.log(id);
    const likeNumber = await Video
        .findOne({
            _id: videoId,
        })
        .select('likes');
    await Video
        .updateOne(
            { _id: videoId },
            { likes: action === 'added' ? (likeNumber.likes + 1) : (likeNumber.likes - 1)}
        );
};

exports.updateVideoDislikes = async (id, action) => {
    const videoId = mongoose.Types.ObjectId(id);
    const dislikeNumber = await Video
        .findOne({
            _id: videoId,
        })
        .select('dislikes');
    await Video
        .updateOne(
            { _id: videoId },
            { dislikes: action === 'added' ? (dislikeNumber.dislikes + 1) : (dislikeNumber.dislikes - 1) }
        );
}