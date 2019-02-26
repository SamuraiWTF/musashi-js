const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello CSP Client!'))

module.exports = app
