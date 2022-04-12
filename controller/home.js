const { StatusCodes } = require('http-status-codes')

const Url = require('../models/Url')
const errorHandler = require('../middleware/errorHandler')
let status = ''

const getHome = async (req, res) => {
  try {
    const shortUrls = await Url.find()
    res.status(StatusCodes.OK).render('../views/home', {
      title: "URL Shortner",
      shortUrls
    })
  } catch (error) {
    errorHandler(res, error, status)
  }
}

const shortUrls = async (req, res) => {
  const { fullUrl } = req.body
  try {
    if (fullUrl == '') {
      status = StatusCodes.BAD_REQUEST
      throw new Error('Please provide a URL')
    }

    const newUrl = new Url({
      fullUrl
    })

    const shortUrl = await Url.create(newUrl)
    if (!shortUrl) {
      status = StatusCodes.NOT_ACCEPTABLE
      throw new Error('Validation failed')
    }
    else {
      res.redirect('/')
    }
  } catch (error) {
    errorHandler(res, error, status)
  }
}

// gets url
const getUrl = async (req, res) => {
  const { shortUrl } = req.params
  console.log(req.params);
  try {
    const url = await Url.findOne({ short: shortUrl })
    if (url == null) {
      status = StatusCodes.NOT_FOUND
      throw new Error(`Short url: ${url} not in DB`)
    }
    else {
      url.clicks++
      await url.save()
      res.redirect(url.fullUrl)
    }
  } catch (error) {
    errorHandler(res, error, status)
  } 
}

module.exports = { getHome, shortUrls, getUrl }