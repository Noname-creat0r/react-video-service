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
    views: {
        type: Number,
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        required: true,
        default: 0,
    },
    likes: {
        type: Number,
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        required: true,
        default: 0,
    },
    dislikes: {
        type: Number,
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        required: true,
        default: 0,
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
    thumbnail: {
        type: Schema.Types.ObjectId, 
        ref: 'Thumbnail'
    },
    file: {
        type: Schema.Types.ObjectId,
        required: true
    }
},  { timestamps: true } );

module.exports = mongoose.model("Video", videoSchema);