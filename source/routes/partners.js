const { map, sumBy } = require('lodash')
const Partner = require('../models/partner')

module.exports = (app) => {
  app.post('/partners', async (req, res) => {
    try {
      const partners = await Partner.find({}).exec()

      const partner = new Partner(req.body)
      await partner.validate()

      const totalPercent = sumBy(partners, 'percent') + partner.percent 
      if (totalPercent > 100) {
        return res.status(400).send({ error: 'Percentual total excedido!' })
      }

      partner.save()
      res.status(200).send({ error: false, partner })
    } catch ({ errors }) {
      res.status(400).send({ error: map(errors, e => e.message)[0] })
    }
  })
}