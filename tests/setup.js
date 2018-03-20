const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_TEST, error => {
  if (error) throw error
})