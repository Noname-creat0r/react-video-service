const mongoose = require('mongoose');
const methods = require('../db/methods');

const streamImgFromBucket = (bucketName, id, res) => {
    const bucket = methods.getGridBucket(bucketName); 
    bucket
        .find({ _id: mongoose.Types.ObjectId(id) })
        .forEach(image => {
            res.setHeader('Content-Type', image.contentType);
            res.setHeader('Content-Disposition', 'attachment');

            const downloadStream = bucket.openDownloadStreamByName(image.filename);
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
}

exports.getThumbnail = (req, res, next) => {
    try { 
        if (!req.query.id) {
            const error = new Error('Missing param in query.');
            error.statusCode = 400;
            throw error;
        }
        streamImgFromBucket('thumbnails', req.query.id, res);
    } catch (error) {
        next(error);
    }
};

exports.getAvatar = (req, res, next) => {
    try {
        if (!req.query.id) {
            const error = new Error('Missing param in query.');
            error.statusCode = 400;
            throw error;
        }
        streamImgFromBucket('avatars', req.query.id, res);
    } catch (error) {
        next(error);
    }
};