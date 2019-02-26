const express = require('express')
const cookieParser = require('cookie-parser')

const api = express()

api.use(express.json({ type: '*/*' }))
api.use(cookieParser())

// Add CORS routes
api.use('/auth', require('./routes/auth'))
api.use('/sop', require('./routes/sop'))
api.use('/pattern', require('.//routes/pattern'))
api.use('/reflect', require('./routes/reflect'))

module.exports = api
