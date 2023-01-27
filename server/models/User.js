const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    playlists: [ {
        type: Schema.Types.ObjectId,
        ref: 'Playlist'
    }]
});

module.exports = mongoose.model("User", userSchema);