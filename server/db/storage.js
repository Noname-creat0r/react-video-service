const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const dbConfig = require('./config');
const path = require('path');
const ext = require('./fileExtensions');

const storage = new GridFsStorage({
    url: dbConfig.baseUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileExt = path.extname(file.originalname);
            const filename = Date.now() + '-' + file.originalname;
            let bucketName;
            // maybe create new mode
        
            console.log(file);
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