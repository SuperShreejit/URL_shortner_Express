// external modules
require('dotenv').config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// internal modules
const { connectDB } = require('./DB/connect')
const router = require('./routes/router')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
 
// views & statics
app.use(express.static('./public'))
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('layout', 'layouts/layout')

// routes
app.use('/', router) 
 
// initialize
const port = process.env.PORT || 3000
const start = async () => {
  try {
    const DB = await connectDB(process.env.MONGO_URL)
    if (!DB)
      throw new Error('Failed to connect to MongoDB')
    else console.info('Connected to Database')

    app.listen(port, () => console.info(`Server listening on port: ${port}`))
    
  } catch (error) {
    console.error(error.message)
  }
}
start()