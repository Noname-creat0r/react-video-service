const mongoose = require('mongoose');
const fs = require('fs');

exports.uploadFile = (file, bucketName, chunkSize, fileId) => {
    const fileName = file.filename;
    const filePath = file.path;

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: bucketName,
        chunkSizeBytes: chunkSize,
    });

    return fs
        .createReadStream(filePath)
        .pipe(bucket.openUploadStreamWithId(fileId, fileName, { 
            chunkSizeBytes: chunkSize
        }))
        .on('error', (error) => {
            console.log("UPLOAD_ERR: " + error);
        });
};

exports.downloadFile = (fileId, bucketName, chunkSize, downloadPath) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: bucketName,
        chunkSizeBytes: chunkSize,
    });

    return bucket
        .openDownloadStream(fileId)
        /*.pipe(fs
            .createWriteStream(downloadPath)
        )*/
        ;
};