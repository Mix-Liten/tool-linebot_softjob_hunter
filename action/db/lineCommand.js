const db = require('../../connection/db')
const Job = require('../../model/Job')

const defaultWork = async () => {
  return Job
  .find()
  .limit(10)
  .sort({ createdAt: -1 })
  .select('title date href')
}

const search = async (searchField, word = '') => {
  let data
  let selectField = 'title date href'
  if (searchField === '' && word === '') {
    data = await defaultWork()
  } else {
    switch (searchField) {
      case 'in_month':
        data = await Job.find({ in_month: true }).select(selectField)
        break
  
      case 'company':
        data = await Job.find({ company: { $regex: word, $options: 'i' } }).select(selectField)
        break
  
      case 'position':
        data = await Job.find({ position: { $regex: word, $options: 'i' } }).select(selectField)
        break
  
      case 'date':
        data = await Job.find({ date: word }).select(selectField)
        break
  
      default:
        data = await defaultWork()
        break
    }
  }

  return data
}

module.exports = search