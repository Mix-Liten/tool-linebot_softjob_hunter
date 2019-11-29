const db = require('../../connection/db')
const Job = require('../../model/Job')
const { code, diffDate } = require('../../utils/time')

const getJobsFromDb = async () => {
  let result
  await Job.find({ in_month: true })
    .then(res => {
      result = res
    })
    .catch(err => result = null)

  // 職缺超過一個月，設定過期
  // 職缺超過一年，從資料庫移除
  result = result.filter(job => {
    if (diffDate(+new Date(), code(job.createdAt)) > 30) {
      Job.update({ _id: job._id }, { in_month: false })
        .then(res => console.log('設定過期成功：' + res.title))
        .catch(err => console.log('設定過期失敗：' + err))
      return false
    }
    if (diffDate(+new Date(), code(job.createdAt)) > 364) {
      Job.remove({ _id: job._id })
        .catch(err => console.log('刪除失敗：' + err))
      return false
    }
    return true
  })
  return result
}

const saveNewJobsDataToDb = async (jobslist) => {
  await jobslist.forEach(async job => {
    let newJob = new Job(job)
    await newJob.save()
      .then(res => console.log('新工作資料成功儲存：' + res.title))
      .catch(err => console.log('新工作資料儲存錯誤\n' + err))
  })
}

module.exports = {
  getJobsFromDb,
  saveNewJobsDataToDb,
}
