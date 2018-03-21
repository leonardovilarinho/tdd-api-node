const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome do novo sócio é obrigatório.']
  },
  percent: {
    type: Number,
    required: [true, 'O percentual do novo sócio é obrigatório.'],
    validate: {
      validator: value => value > 0 && value <= 100,
      message: 'Por favor, preencha um percentual entre 1 e 100!'
    }
  }
})

module.exports = mongoose.model('Partner', schema)