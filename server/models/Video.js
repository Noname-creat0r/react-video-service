const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    length: {
        type: Number,
        min: 1,
        max: Number.MAX_SAFE_INTEGER,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Commentary'
    }],
    file: {
        type: Schema.Types.ObjectId,
        required: true
    }

});

module.exports = mongoose.model("Video", videoSchema);