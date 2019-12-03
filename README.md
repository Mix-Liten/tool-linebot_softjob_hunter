# LineBot_SoftJob_Hunter

基於 Node.js Express 實作的Line Bot，目的是使用日常使用的聊天軟體 Line 接收 [PTT Soft_Job板](https://www.ptt.cc/bbs/Soft_Job/index.html) 的徵才文，如果你也在找工作，並且也想試著自己部署服務到線上，你可以跟著下面 Deployment 的步驟做做看。

另外解釋一下為什麼我不在這裡放 QR Code 讓人直接加來使用，因為 Line Bot 的服務有改過方案條件，以前是限制人數，但機器人回應的數量不限制，現在免費方案每月只能回應500則訊息，所以建議有需求的話，可以做給自己和朋友用，或是你的需求也是要追蹤 PTT 的話，推薦 [Ptt Alertor] (http://pttalertor.dinolai.com/)。

# Deployment

1. 首先要先有 MongoDB 和 可以放 Node.js 程式的伺服器，免費仔推薦使用 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 和 [Heroku](https://www.heroku.com/)

2. 