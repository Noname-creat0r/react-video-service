const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    about: { type: String },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
});

module.exports = mongoose.model('Playlist', playlistSchema);