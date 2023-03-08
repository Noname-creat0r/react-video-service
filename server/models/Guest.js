const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
   trialVideos: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
        default: 10,
   },
   ip: {
        type: String,
        required: true,
        default: '127.0.0.1',
   }
},  { timestamps: true } );

module.exports = mongoose.model("Guest", videoSchema);