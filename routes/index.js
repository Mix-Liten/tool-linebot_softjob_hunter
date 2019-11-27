const router = require('express').Router()
const jobController = require('../controller/jobController')

router.post('/job', jobController)

module.exports = router