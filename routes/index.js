const router = require('express').Router()
const jobController = require('../controller/jobController')
const lineBotController = require('../controller/lineBotController')

router.post('/job', jobController)
router.post('/line', lineBotController)

module.exports = router