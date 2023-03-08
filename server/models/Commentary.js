const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentarySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  },
  text: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
    default: 0,
    required: true
  },
  dislikes: {
    type: Number,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
    default: 0,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Commentary', commentarySchema)
