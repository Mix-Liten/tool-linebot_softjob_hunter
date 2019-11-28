const {
  getJobsFromDb,
  saveNewJobsDataToDb,
} = require('../action/db/getJobs')
const {
  getJobs,
  dataBaseInit,
} = require('../action/crawler')

const jobController = async (req, res) => {
  res.header('Content-Type', 'text/plain; charset=utf-8')
  const jobsFromCrawler = await getJobs() // 得到一個陣列，包含當日所有徵才訊息
  // const jobsFromCrawler = await dataBaseInit() // 初始化時使用
  const dateString = `${new Date().getMonth() + 1}/${new Date().getDate()}`
  if (jobsFromCrawler === null) {
    console.log(`${dateString} 沒有新徵才文`)
    res.end(`定時任務結束，${dateString} 沒有新徵才文`)
    return
  }

  // 核對非重複部分
  const jobsFromDb = await getJobsFromDb()
  const jobslist = jobsFromCrawler.filter(jobFromCrawler => {
    let hasSameData = false
    jobsFromDb.forEach(jobFromDb => {
      if (jobFromDb.href === jobFromCrawler.href) {
        hasSameData = true
      }
    })
    return !hasSameData
  })

  const newJobNum = jobslist.length

  if (newJobNum === 0) {
    console.log(`定時任務結束，移除重複後，${dateString} 沒有新徵才文`)
    res.end(`定時任務結束，移除重複後，${dateString} 沒有新徵才文`)
    return
  }

  // 非重複部分存進資料庫
  await saveNewJobsDataToDb(jobslist)
  console.log(`定時任務結束，${dateString} 新增 ${newJobNum} 筆新職缺`)
  res.end(`定時任務結束，${dateString} 新增 ${newJobNum} 筆新職缺`)
}

module.exports = jobController