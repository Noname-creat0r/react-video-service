const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentarySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        min: 0,
        max: 9999999,
        default: 0,
        required: true
    },
    dislikes: {
        type: Number,
        min: 0,
        max: 9999999,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('Commentary', commentarySchema);