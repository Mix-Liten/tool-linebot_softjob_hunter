const bot = require('../connection/linebot')
const { commandList, helperList } = require('../utils/reply')
const lineCommand = require('../action/db/lineCommand')

const styleDataToMessage = dbData => {
  let msg = ''
  let num = 1
  let isMoreThanTwenty = dbData.length > 20
  dbData.forEach(data => {
    msg += `${num++}. ${data.date} ${data.title}\n${process.env.BASEURL}${data.href}\n`
  })
  if (isMoreThanTwenty) msg += helperList[3].message // 避免回復過長，最多回應20筆資料
  return msg
}

bot.on('message', async (evt) => {
  if (evt.message.type !== 'text') return
  const message = evt.message.text.trim()
  const cmd = commandList.filter(command => message.indexOf(command['word']) > -1)[0] || {}
  const searchWord = message.replace(cmd.regex, '')
  let replyMessage = ''

  if (!cmd['word']) {
    if (message === '!指令') {
      replyMessage = helperList[1].message // 指令表
    } else {
      replyMessage = helperList[0].message // 非查詢語句的其他回應
    }
  } else {
    let data
    switch (cmd['regex']) {
      case null:
        data = await lineCommand(cmd['search'])
        break
  
      default:
        data = await lineCommand(cmd['search'], searchWord)
        break
    }
    if (data.length) {
      replyMessage = styleDataToMessage(data)
    } else {
      replyMessage = helperList[2].message // 查無資料
    }
  }

  evt.reply(replyMessage)
    .catch(function (error) {
      console.log(`linebot reply error:\n1. message = ${evt.message.text}\n2. error = ${error}`)
    })
})

module.exports = bot.parser()

// postman testing
// const test = async (req, res) => {
//   const message = req.query.message
//   const cmd = commandList.filter(command => message.indexOf(command['word']) > -1)[0] || {}
//   const searchWord = message.replace(cmd.regex, '')
//   let replyMessage = ''

//   if (!cmd['word']) {
//     if (message === '!指令') {
//       replyMessage = helperList[1].message // 指令表
//     } else {
//       replyMessage = helperList[0].message // 非查詢語句的其他回應
//     }
//   } else {
//     let data
//     switch (cmd['regex']) {
//       case null:
//         data = await lineCommand(cmd['search'])
//         break
  
//       default:
//         data = await lineCommand(cmd['search'], searchWord)
//         break
//     }
//     if (data.length) {
//       replyMessage = styleDataToMessage(data)
//     } else {
//       replyMessage = helperList[2].message // 查無資料
//     }
//   }

//   res.end(replyMessage)
// }
// module.exports = test