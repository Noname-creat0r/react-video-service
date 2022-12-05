const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    length: {
        type: Number,
        min: 1,
        max: 36000,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Commentary'
    }]

});

module.exports = mongoose.model("Video", videoSchema);