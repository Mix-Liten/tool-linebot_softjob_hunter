const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./routes')

app.use(async (req, res, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log(req.method, req.url, ms)
})

app.on('error', err => console.log(`server error ${err}`))

app.use('', router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`server open on PORT ${PORT}`)
)