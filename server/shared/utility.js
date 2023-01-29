const User = require('../models/User');
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

    const isLiked = await model
        .findOne({
            author: author,
            video:  video,
        })
        .exec();
    if (!isLiked){
        const newInstance = new model({
            author: author,
            video:  video
        });
        await newInstance.save();
        action = 'added';
    } 
    else {
        await model.deleteOne({
            author: author,
            video:  video
        });
        action = 'removed';
    }

    return {
        model: model.modelName,
        action: action,
    };
};