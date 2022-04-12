const mongoose = require('mongoose')
const shortId = require('shortid')

const UrlSchema = mongoose.Schema({
  fullUrl: {
    type: String,
    required: [true, 'Please provide a Url'],
    trim: true
  },
  short: {
    type: String,
    required: true,
    default:shortId.generate()
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model('Url', UrlSchema)