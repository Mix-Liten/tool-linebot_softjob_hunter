const db = require('../database/dbconnection')
const Job = require('../model/Job')

const saveNewJobsDataToDb = jobslist => {
  jobslist.forEach(job => {
    let newJob = new Job(job)
    newJob.save()
      .then(res => console.log('新工作資料成功儲存\n' + res))
      .catch(err => console.log('新工作資料儲存錯誤\n' + err))
  })
}

module.exports = saveNewJobsDataToDb