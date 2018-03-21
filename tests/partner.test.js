const request = require('supertest')
const app = require('../source/app')

const template = { name: 'Leonardo', percent: 50 }
const { assign } = Object
const feature = '/partners'

describe('Partner feature', () => {
  test('Name should is a pure string and percent between 1 and 100', async () => {
    const { text, statusCode } = await request(app).post(feature).send(template)
    const { error, partner } = JSON.parse(text)

    expect(statusCode).toBe(200)
    expect(error).toBeFalsy()
    expect(partner.name).toBe(template.name)
    expect(partner.percent).toBe(template.percent)
  })

  const testWithoutProperty = async (property, propertyName) => {
    const partner = assign({}, template)
    delete partner[property]
    const { text, statusCode } = await request(app).post(feature).send(partner)
    const { error } = JSON.parse(text)

    expect(statusCode).toBe(400)
    expect(error).toContain(propertyName)
    expect(error).toContain('obrigatório')
  }

  test('Partners name is required', async () => {
    await testWithoutProperty('name', 'nome')
  })

  test('Partners percent is required', async () => {
    await testWithoutProperty('percent', 'percentual')
  })

  const testBetweenPercentInvalid = async (percent) => {
    const partner = assign({}, template, { percent })
    const { text, statusCode } = await request(app).post(feature).send(partner)
    const { error } = JSON.parse(text)

    expect(statusCode).toBe(400)
    expect(error).toContain('percentual')
    expect(error).toContain('1 e 100')
  }

  test('Percent should is > 0', async () => {
    await testBetweenPercentInvalid(0)
    await testBetweenPercentInvalid(-1)
  })

  test('Percent should is <= 100', async () => {
    await testBetweenPercentInvalid(101)
  })

  test('Sum of percents should <= 100', async () => {
    const newPartner = assign({}, template, { percent: 51 })

    const { text, statusCode } = await request(app).post(feature).send(newPartner)
    const { error } = JSON.parse(text)

    expect(statusCode).toBe(400)
    expect(error).toContain('total')
    expect(error).toContain('excedido')
  })
})