const code = date => +new Date(date)
const getYear = timestamp => (new Date(timestamp)).getFullYear()
const getMonth = timestamp => (new Date(timestamp)).getMonth() + 1
const getDate = timestamp => (new Date(timestamp)).getDate()
const diffDate = (newDate, oldDate) => (new Date(newDate) - new Date(oldDate)) / (1000 * 60 * 60 * 24)

module.exports = {
  code,
  getYear,
  getMonth,
  getDate,
  diffDate,
}