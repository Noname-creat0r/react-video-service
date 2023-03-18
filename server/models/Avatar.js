const mongoose = require('mongoose')
const Schema = mongoose.Schema

const avatarSchema = new Schema({
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Avatar', avatarSchema)
