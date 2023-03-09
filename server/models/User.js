const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    required: true,
    ref: 'UserType'
  },
  avatar: {
    type: Schema.Types.ObjectId
  },
  playlistBookmarks: [
    {
      playlist: {
        type: Schema.Types.ObjectId,
        ref: 'Playlist'
      },
      video: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
      }
    }
  ]
})

module.exports = mongoose.model('User', userSchema)
