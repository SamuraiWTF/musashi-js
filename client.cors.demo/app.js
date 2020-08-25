const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const jucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('client.cors.demo/views'))

const apiHost = process.env.CORS_API_HOST || 'api.cors.dem';

jucksEnv.express(app)
app.set('view engine', 'njk')

app.use(express.static('client.cors.demo/static'))

app.get('/', (req, res) => {
    res.render('index', { apiHost: apiHost, protocol: stringToBool(process.env.USE_TLS) ? 'https' : 'http' })
})

module.exports = app

function stringToBool(str) {
    let test = str.toUpperCase().trim();
    if(["TRUE","Y","YES","1"].indexOf(test) > -1) {
      return true
    } else if (["FALSE","N","NO","0"].indexOf(test) > -1) {
      return false
    } else {
      console.error(`Invalid value in stringToBool: ${str}`)
      return undefined
    }
  }