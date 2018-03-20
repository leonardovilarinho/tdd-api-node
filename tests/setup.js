const mongoose = require('mongoose')
require('dotenv').config()

beforeAll(done => mongoose.connect(process.env.DB_TEST, done))
afterAll(done => mongoose.connection.dropDatabase(done))