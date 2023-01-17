const { ObjectId } = require('mongoose').Types;

module.exports = (req, res, next) => {
    req.body.thumbnailId = new ObjectId();
    req.body.videoId = new ObjectId();
    console.log(req.body.thumbnailId);
    console.log(req.body.videoId);
    
    next();
};