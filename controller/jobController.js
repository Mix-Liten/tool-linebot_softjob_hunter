const { getJobs } = require('../action/crawler');

const jobController = async (req, res) => {
  const jobsFromCrawler = await getJobs()
  res.end('<h1>test</h1>')
}

module.exports = jobController