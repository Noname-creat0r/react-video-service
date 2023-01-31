const mongoose = require('mongoose');

exports.getGridBucket = (bucketName) => {
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: bucketName,
    });
} 

exports.downloadFile = (fileId, bucketName, chunkSize) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: bucketName,
        chunkSizeBytes: chunkSize,
    });

    return bucket
        .openDownloadStream(fileId);
};