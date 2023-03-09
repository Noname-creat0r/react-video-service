const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTypeSchema = new Schema({
  type: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('UserType', userTypeSchema)
