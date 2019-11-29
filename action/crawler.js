const request = require('request')
const cheerio = require('cheerio')

const getJobs = async () => {
  const indexURL = process.env.PTT_SOFTJOB_URL.replace(/<pageNumber>/, '') // 最新的頁面沒有 pageNumber
  let result = []
  let jobslist = await getJobsFormCurrentPage(indexURL)
  do {
    result = [...result, ...jobslist.list]
    nextURL = process.env.PTT_SOFTJOB_URL.replace(/<pageNumber>/, jobslist.prevpageNumber)
    jobslist = await getJobsFormCurrentPage(nextURL)
  } while (!jobslist.onlyOtherDate)
  return result
}

const getJobsFormCurrentPage = async (url) => {
  let result = await new Promise((resolve, reject) => {
    request(url, async (err, res, body) => {
      if (err) return reject(err)

      const prevpageNumber = await getPttFirstPrevpageNumber(body)
      const jobslist = await getPttJobslist(body)

      const regex = /(.*)\/(.*)/
      const todayDate = new Date()
      const today = [todayDate.getMonth() + 1, todayDate.getDate()]
      // 搜尋前一天，確保沒有遺漏
      let yesterdayDate = new Date((new Date()).setDate(todayDate.getDate() - 1))
      const yesterday = [yesterdayDate.getMonth() + 1, yesterdayDate.getDate()]
      const datelist = jobslist.map(job => job.date.match(regex))
      let onlyOtherDate = false
      if (datelist) {
        // date[] => [ '11/21', '11', '21', index: 0, input: '11/21', groups: undefined ]
        onlyOtherDate = datelist.every(date => (date[1] != today[0] || date[2] != today[1]) && (date[1] != yesterday[0] || date[2] != yesterday[1]))
      }

      let result = {
        onlyOtherDate,
      }
      result.prevpageNumber = onlyOtherDate ? null : prevpageNumber
      result.list = jobslist.filter(job => job.date === `${today[0]}/${today[1]}` || job.date === `${yesterday[0]}/${yesterday[1]}`)
      resolve(result)
    })
  })
  return result
}

/**
 * 取得「上頁」按鈕的 href 中 index 到 .html 中間的數值
 */
const getPttFirstPrevpageNumber = body => {
  const $ = cheerio.load(body)
  const regex = /index(.*\d)\.html/
  const href = $('.btn-group-paging')
    .find('a')
    .eq(1)
    .attr('href')
  const prevpageNumber = regex.exec(href)[1]
  return prevpageNumber
}

/**
 * 取得當前頁面上 title 包含 [徵才] 字串的 title、href、日期
 */
const getPttJobslist = body => {
  const $ = cheerio.load(body)
  const regex = /\[徵才\]/
  const regex_company_and_job = /\[徵才\](.*)徵+(.*)/
  const result = []

  $('.r-ent .title a').each((index, el) => {
    const title = $(el).text()
    if (regex.test(title)) {
      const href = $(el).attr('href')
      const r_ent = $(el)
        .parent()
        .parent()
      const ary = regex_company_and_job.exec(title) // 當不成功時會返回 null
      const company = ary ? ary[1].replace(/誠/, '').trim() : '' // 去掉 regex 無法避免的「誠」字
      const position = ary ? ary[2].trim() : ''
      const date = r_ent
        .find('.meta .date')
        .text()
        .trim()
      result.push({ title, company, position, date, href })
    }
  })
  return result.reverse()
}

/**
 * 專案起始執行，直到指定日期(10/29)為止，一直往前翻頁
 */
const dataBaseInit = async () => {
  const getJobsFormCurrentPage = async (url) => {
    let result = await new Promise((resolve, reject) => {
      request(url, async (err, res, body) => {
        if (err) return reject(err)
  
        const prevpageNumber = await getPttFirstPrevpageNumber(body)
        const jobslist = await getPttJobslist(body)
  
        const regex = /(.*)\/(.*)/
        const datelist = jobslist.map(job => job.date.match(regex))
  
        let shouldStop = false
        datelist.forEach(date => {
          if (date[1] == '10' && parseInt(date[2]) < 29) {
            shouldStop = true
          }
        })
        let result = {
          shouldStop,
          prevpageNumber,
          list: [...jobslist]
        }
        resolve(result)
      })
    })
    return result
  }
  const indexURL = process.env.PTT_SOFTJOB_URL.replace(/<pageNumber>/, '')
  let result = []
  let jobslist = await getJobsFormCurrentPage(indexURL)
  if (jobslist === null) return null

  do {
    result = [...result, ...jobslist.list]
    nextURL = process.env.PTT_SOFTJOB_URL.replace(/<pageNumber>/, jobslist.prevpageNumber)
    jobslist = await getJobsFormCurrentPage(nextURL)
  } while (!jobslist.shouldStop)
  return result
}

module.exports = {
  getJobs,
  dataBaseInit,
}