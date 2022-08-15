# LineBot_SoftJob_Hunter

基於 Node.js Express 實作的 Line Bot，目的是使用日常使用的聊天軟體 Line 接收 [PTT Soft_Job板](https://www.ptt.cc/bbs/Soft_Job/index.html) 的徵才文，如果你也在找工作，並且也想試著自己部署服務到線上，你可以跟著下面 Deployment 的步驟做做看。

另外解釋一下為什麼我不在這裡放 QR Code 讓人直接加來使用，因為 Line Bot 的服務有改過方案，以前是限制人數，但機器人回應的數量不限制，現在免費方案每月只能回應500則訊息，所以建議有需求的話，可以做給自己和朋友用，或是你的需求只是要追蹤 PTT 的話，推薦 [Ptt Alertor](https://pttalertor.dinolai.com/line)。

## Deployment

1. 首先要先有 MongoDB 和 可以放 Node.js 程式的伺服器，免費仔推薦使用 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 和 [Heroku](https://www.heroku.com/)，以下也已這兩個服務為例

2. 到 [Line Developers](https://developers.line.biz/) 註冊 `Messaging API`

3. 填寫環境變數，把 `.env.sample` 重新命名為 `.env`，如果系統不允許檔名開頭用點的話，解決方法是命名為 `.env.`。

```
DB_URL = mongodb://<user>:<password>@sandbox/<project>
DB_USER = <user>
DB_PASSWORD = <password>
DB_PROJECT = <project>
```
DB 開頭系列，URL 是資料庫的連線網址，其他幾個變數可以不用另外填，找到 `/connection/db.js` 把 `replace()` 都拿掉即可

```
BASEURL = https://www.ptt.cc
PTT_SOFTJOB_URL = https://www.ptt.cc/bbs/Soft_Job/index<pageNumber>.html
```
這兩個不要改

```
CHANNEL_ID = 
CHANNEL_SECRET = 
CHANNEL_ACCESS_TOKEN = 
```
步驟二完成後可在後台找到這三個變數

```
SCHEDULE_URL = /job
HEROKU_URL = /
```
SCHEDULE_URL 是部署後的網址後加 `/job`，功用是每天換日時去爬前一天的文章

HEROKU_URL 的用途比較不好說，因為 Heroku 免費方案三十分鐘沒事就會休眠，所以設定每三十分鐘就會戳一下

```
TZ = Asia/Taipei
```
為了確保伺服器時間符合預期，記得設定時區相關設定，以 Heroku 為例，在環境變數中增加 `TZ` 變數，變數值要填什麼請查閱 [List of tz database time zones - Wiki](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

4. 事前準備結束，使用 [Heroku CLI](https://devcenter.heroku.com/categories/command-line) 將程式碼推到伺服器上

5. 將步驟三有用到的變數設定到伺服器上

6. 到 [Line Developers](https://developers.line.biz/) 設定 `Webhook URL`，如果沒改路由的話應該是部署後的網址後加 `/line`，並使用 `Verify` 測試功能串接成功與否

## Reference

如果文字步驟看不懂，請參考下方圖文並茂的教學，不過我看到的後台跟他的不一樣

- [做一個 LINE chatbot ！](https://medium.com/alpha-camp-%E5%8F%B0%E7%81%A3/%E5%81%9A%E4%B8%80%E5%80%8B-line-chatbot-628c7c3707c7) 
