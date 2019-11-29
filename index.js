const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./routes')
const request = require('request')
const schedule = require('node-schedule')

app.use(async (req, res, next) => {
  if (req.url === '/') next()
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log(req.method, req.url, `${ms} ms`)
})

app.on('error', err => console.log(`server error ${err}`))

app.use('', router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`server open on PORT ${PORT}`)
)

// 每天24點時抓取前一天的職缺
let autoSchedule = schedule.scheduleJob('0 0 23 * * *', function () {
  const URL = process.env.SCHEDULE_URL || 'http://localhost:5000/job'
  request.post(URL)
})

// 每天三十分鐘戳一下heroku server，避免app被睡
let herokuSchedule = schedule.scheduleJob('* */30 * * * *', function () {
  const URL = process.env.HEROKU_URL || 'http://localhost:5000/'
  request.get(URL)
})