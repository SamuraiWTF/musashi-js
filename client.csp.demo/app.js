const express = require('express')
const nunjucks = require('nunjucks')
const resHeaders = require('./middleware/responseHeaders')

const app = express()
const jucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('client.csp.demo/views'))
const supportedDirectives = ['default-src', 'script-src', 'style-src', 'img-src', 'connect-src', 'font-src', 'object-src', 'media-src', 'child-src', 'frame-ancestors']

jucksEnv.express(app)
app.set('view engine', 'njk')

app.use(resHeaders({
  'Cache-Control': 'no-cache',
}))

global.csp = `default-src 'self'`
global.cspDirectives = { 'default-src': `'self'` }

const globalCsp = (req, res, next) => {
  if(global.csp.trim().length > 0) {
    res.set('Content-Security-Policy', global.csp)
    next()
  }
}

const constructCSP = ((supportedDirectives)=>{
  return (cspMap) => {
    return supportedDirectives.reduce((policy, directive) => {
      if(cspMap[`use-${directive}`] === 'on') {
        policy.push(`${directive} ${cspMap[directive]}`)
      }
      return policy
    }, []).join('; ')
  }
})(supportedDirectives)

app.get('/', globalCsp, (req, res) => res.render('index'))
app.get('/set-csp', (req, res) => res.render('set-csp', { allDirectives: supportedDirectives, currDirectives: cspDirectives }))
app.post('/set-csp', express.urlencoded(), (req, res) => {
  csp = constructCSP(req.body)
  console.log(`CSP set to ${csp}`)
  cspDirectives = req.body
  res.redirect('/set-csp')
})

module.exports = app
