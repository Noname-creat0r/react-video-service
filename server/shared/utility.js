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
        //videoInfo['authorName'] = author.name;
        infoArrWithAuthors.push( this.updateObject(videoInfo, {
            authorName: author.name
        }));
    };
    return infoArrWithAuthors;
};