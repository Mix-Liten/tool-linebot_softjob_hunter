const bot = require('../connection/linebot')
const { commandList, helperList } = require('../utils/reply')
const lineCommand = require('../action/db/lineCommand')

const styleDataToMessage = dbData => {
  let msg = ''
  let num = 1
  dbData.forEach(data => {
    msg += `
    ${num++}. ${data.title} %0D%0A
    ${process.env.BASEURL}${data.href}
    `
  })
  return msg
}

bot.on('message', async (evt) => {
  if (evt.message.type !== 'text') return
  const message = evt.message.text.trim()
  const cmd = commandList.filter(command => message.indexOf(command['word']) > -1)[0] || []
  const searchWord = message.replace(cmd.regex, '')
  let replyMessage = ''

  if (!cmd.length) {
    if (message === '!指令') {
      replyMessage = helperList[1].message // 指令表
    } else {
      replyMessage = helperList[0].message // 非查詢語句的其他回應
    }
  }

  let data
  switch (cmd['regex']) {
    case null:
      data = await lineCommand(cmd['search'])
      break

    default:
      data = await lineCommand(cmd['search'], searchWord)
      break
  }
  if (!data) {
    replyMessage = helperList[2].message // 查無資料
  } else {
    replyMessage = styleDataToMessage(data)
  }

  evt.reply(replyMessage)
    .catch(function (error) {
      console.log(`linebot reply error:\n1. message = ${evt.message.text}\n2. error = ${error}`)
    })
})

module.exports = bot.parser()