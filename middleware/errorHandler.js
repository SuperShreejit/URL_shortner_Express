const { StatusCodes } = require('http-status-codes')

const errorHandler = async (res, error, status ) => {
  if (status == '') {
    status = StatusCodes.INTERNAL_SERVER_ERROR
    errMsg = 'Something went wrong, Please try again later'
    return res.status(status).json({ errMsg })
  }
  if (error.message.startsWith('Cast')) {
    errMsg = 'URL not accepted, illegal parameters'
    status = StatusCodes.BAD_REQUEST
    return res.status(status).json({ errMsg })
  }
  errMsg = error.message
  return res.status(status).json({ errMsg })
}

module.exports = errorHandler