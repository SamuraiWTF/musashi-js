const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const jucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('client.cors.demo/views'))

jucksEnv.express(app)
app.set('view engine', 'njk')

app.use(express.static('client.cors.demo/static'))

app.get('/', (req, res) => {
    res.render('index')
})

module.exports = app
