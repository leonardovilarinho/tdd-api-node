const request = require('supertest')
const app = require('../source/app')

const template = { name: 'Leonardo', percent: 50 }
const { assign } = Object
const feature = '/partners'

describe('Partner feature', () => {
  test('Name should is a pure string and percent between 1 and 100', async done => {
    const { text, statusCode } = await request(app).post(feature).send(template)
    const { error, partner } = JSON.parse(text)

    expect(statusCode).toBe(200)
    expect(error).toBeFalsy()
    expect(partner.name).toBe(template.name)
    expect(partner.percent).toBe(template.percent)
    done()
  })
})