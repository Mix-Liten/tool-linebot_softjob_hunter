const db = require('../database/dbconnection')
const Job = require('../model/Job')
const { code, diffDate } = require('../utils/time')

const getJobsFromDb = async () => {
  let result
  await Job.find({ in_month: true })
    .then(res => {
      result = res
    })
    .catch(err => result = null)

  // 職缺超過一個月，設定過期
  result = result.filter(job => {
    if (diffDate(+new Date(), code(job.createdAt)) > 30) {
      Job.update({ _id: job._id }, { in_month: false })
        .then(res => console.log('設定過期成功：' + res.title))
        .catch(err => console.log('設定過期失敗：' + err))
      return false
    }
    return true
  })
  return result
}

module.exports = getJobsFromDb