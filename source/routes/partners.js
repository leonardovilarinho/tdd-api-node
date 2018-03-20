const Partner = require('../models/partner')

module.exports = (app) => {
  app.post('/partners', async (req, res) => {
    const partner = await Partner.create(req.body)
    res.status(200).send({ error: false, partner })
  })
}