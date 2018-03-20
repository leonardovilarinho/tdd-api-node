const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  percent: Number
})

module.exports = mongoose.model('Partner', schema)