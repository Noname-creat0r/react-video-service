const mongoose = require('mongoose');
const GridFS = require('mongoose-gridfs');

const Video = require('../models/Video');
const baseUrl = require('../server');

exports.getVideo = (req, res, next) => {

};

exports.postVideo = (req, res, next) => {
    mongoose
        .connect(baseUrl)
        .then((result) => {
            const Video = GridFS.createModel();
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};