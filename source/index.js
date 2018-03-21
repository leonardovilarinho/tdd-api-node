require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const { PORT, DB_PROD } = process.env
mongoose.connect(DB_PROD, (error) => {
  if(error) throw error

  app.listen(PORT, () => console.log(`Serving in : ${PORT}`))
})