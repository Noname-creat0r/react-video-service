const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
});

module.exports = mongoose.model("Like", likeSchema);