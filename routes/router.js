const express = require('express')
const router = express.Router()

const {
  getHome,
  shortUrls,
  getUrl
} = require('../controller/')

router.route('/').get(getHome).post(shortUrls)
router.route('/:shortUrl').get(getUrl)

module.exports = router