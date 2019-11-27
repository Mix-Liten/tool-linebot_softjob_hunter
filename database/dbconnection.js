const mongoose = require('mongoose')

// 設定狀態回應
const db = mongoose.connection
db.on('error', err => console.error(`連結資料庫失敗: ${err}`))
db.once('open', () => console.log('成功連結資料庫。'))

// 連結資料庫
const dbURL = process.env.DB_URL
  .replace(/<user>/, process.env.DB_USER)
  .replace(/<password>/, process.env.DB_PASSWORD)
  .replace(/<project>/, process.env.DB_PROJECT)

mongoose.connect(dbURL, {
  useNewUrlParser: true, // 解析URL
  useCreateIndex: true, // 自動新增id
  useUnifiedTopology: true,
})

module.exports = mongoose