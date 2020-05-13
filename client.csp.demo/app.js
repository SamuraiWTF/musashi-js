const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const exerciseRoutes = require('./routes/exercise')
const resHeaders = require('./middleware/responseHeaders')
const generateNonce = require('./middleware/generateNonce')

const app = express()
const jucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('client.csp.demo/views'))
const supportedDirectives = ['default-src', 'script-src', 'style-src', 'img-src', 'connect-src', 'font-src', 'object-src', 'media-src', 'child-src', 'frame-ancestors', 'form-action', 'base-uri']


jucksEnv.express(app)
app.set('view engine', 'njk')

app.use(cookieParser())
app.use(resHeaders({
  'Cache-Control': 'no-cache',
}))

app.use(express.static('client.csp.demo/static'))

global.csp = `default-src 'self'`
global.cspDirectives = { 'default-src': `'self'`, 'use-default-src': 'on' }

const globalCsp = (req, res, next) => {
  if(global.csp.trim().length > 0) {
    res.set('Content-Security-Policy', global.csp.replace(/\$nonce/g, res.nonce))
    res.set('Content-Security-Policy-Report-Only', 'report-uri /csp-report; ' + global.csp.replace(/\$nonce/g, res.nonce))
  }
  next()
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

app.get('/', generateNonce, globalCsp, (req, res) => res.render('index', { nonce: res.nonce }))
app.post('/', express.urlencoded(), generateNonce, globalCsp, (req, res) => res.render('index', { payload: req.body.unsafeReflection, nonce: res.nonce }))
app.get('/set-csp', (req, res) => res.render('set-csp', { msg: req.query.msg, allDirectives: supportedDirectives, currDirectives: cspDirectives }))
app.post('/set-csp', express.urlencoded(), (req, res) => {
  csp = constructCSP(req.body)
  console.log(`CSP set to ${csp}`)
  console.log('referer', req.header('referer'))
  cspDirectives = req.body
  res.cookie('cspLastSetBy', req.header('referer'))
  if(req.body.ex) {
    res.redirect(`/ex/${req.body.ex}`)
  } else {
    res.redirect(`/set-csp?msg=${encodeURIComponent('The CSP has been updated')}`)
  }
})

app.use('/ex', exerciseRoutes)

/*app.get('/ex/1', (req, res) => {

    let postBody = req.body || {}
    
})*/

module.exports = app
