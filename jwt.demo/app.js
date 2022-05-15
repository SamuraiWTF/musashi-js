const express = require('express')
const nunjucks = require('nunjucks')
const stringToBool = require('../common/stringToBool')
const jwt = require('jsonwebtoken')

const app = express()
const api = express.Router()
const jucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('jwt.demo/views'))

const host = process.env.JWT_HOST || 'jwt.demo';
const protocol = stringToBool(process.env.USE_TLS) ? 'https' : 'http';

// Escape backticks - for dumping variables into template literals on the front-end.
jucksEnv.addFilter("escbt", (str) => {
  return str.replace(/`/g, '\\`');
});

jucksEnv.express(app)
app.set('view engine', 'njk')

app.use(express.static('jwt.demo/static'))

app.get('/', (req, res) => {
    res.render('index', { apiHost: host, protocol: protocol })
})

api.use(express.json())

api.post('/sign', (req, res) => {
  const { header, body, secret } = req.body;
  const alg = header.alg.toUpperCase()
  const payload = JSON.stringify(body)
  const token = jwt.sign(payload, secret, { algorithm: alg })
  res.status(200).send({ token: token })
})

api.post('/fuzz', (req, res) => {
  res.status(200).send({hello: 'world'})
})

app.use('/api', api)

module.exports = app