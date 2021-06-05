const express = require('express')
const nunjucks = require('nunjucks')
const stringToBool = require('../common/stringToBool')

const app = express()
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

module.exports = app