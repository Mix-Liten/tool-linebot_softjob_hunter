const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    // required: true
  },
  position: {
    type: String,
    // required: true
  },
  href: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  in_month: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true,
  versionKey: false,
})

module.exports = mongoose.model('Job', JobSchema)