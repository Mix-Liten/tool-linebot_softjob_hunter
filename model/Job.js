const mongoose = require('mongoose')
const { autoIncrement } = require('mongoose-plugin-autoinc-fix')

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

JobSchema.plugin(autoIncrement, { model: 'Job', field: 'Id' })

module.exports = mongoose.model('Job', JobSchema)