const router = require('express').Router()
const jobController = require('../controller/jobController')

router.get('/', jobController);

module.exports = router