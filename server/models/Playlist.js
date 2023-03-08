const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  description: { type: String },
  thumbnail: {
    type: Schema.Types.ObjectId,
    ref: 'Thumbnail'
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Video'
    }
  ]
})

module.exports = mongoose.model('Playlist', playlistSchema)
