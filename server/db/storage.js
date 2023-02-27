const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const path = require('path');
const ext = require('./fileExtensions');

const baseUrl = process.env.BASE_URL;

const storage = new GridFsStorage({
    url: baseUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileExt = path.extname(file.originalname);
            const filename = Date.now() + '-' + file.originalname;
            let bucketName;

            switch (fileExt) {
                case ext.MP4:
                    bucketName = 'videos';
                    break;
                default:
                    bucketName = req.body.imageType === 'thumbnail' ? 'thumbnails' : 'avatars';
                    break;
            }

            const fileInfo = {
                filename: filename,
                bucketName: bucketName,
            };

            if (!filename || !bucketName)
                return reject(new Error("Can not get file info!" ));
            resolve(fileInfo);
        }) 
    }
});

module.exports.upload = multer({ storage });