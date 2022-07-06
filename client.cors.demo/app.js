const express = require('express')
const nunjucks = require('nunjucks')

const stringToBool = require('../common/stringToBool')

const app = express()
const jucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('client.cors.demo/views'))

const apiHost = process.env.CORS_API_HOST || 'api.cors.test:8443';
const protocol = stringToBool(process.env.USE_HTTP) ? 'http' : 'https'; // default to https

// Escape backticks - for dumping variables into template literals on the front-end.
jucksEnv.addFilter("escbt", (str) => {
  return str.replace(/`/g, '\\`');
});

jucksEnv.express(app)
app.set('view engine', 'njk')

app.use(express.static('client.cors.demo/static'))

app.get('/', (req, res) => {
    res.render('index', { apiHost: apiHost, protocol: protocol })
})

app.get('/settings', (req, res) => {
    res.render('settings', { apiHost: apiHost, protocol: protocol })
})

app.get('/ex/:exnum', (req, res) => {
  res.render(`exercises/ex${req.params.exnum}`, { apiHost: apiHost, protocol: protocol, exnum: req.params.exnum, corsClientHost: process.env.CORS_CLIENT_HOST, showSolution: false })  
})

app.post('/ex/:exnum', (req, res) => {
  res.render(`exercises/ex${req.params.exnum}`, { apiHost: apiHost, protocol: protocol, exnum: req.params.exnum, corsClientHost: process.env.CORS_CLIENT_HOST, showSolution: true })  
})

module.exports = app