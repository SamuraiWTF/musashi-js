const express = require('express')
const router = express.Router()
const exerciseSetCsp = require('../middleware/exerciseSetCsp')

router.use(exerciseSetCsp)

router.get('/1', (req, res) => {
  res.render(`ex1`, { cspIsSet: req.exSetPolicy, isPost: false, isSuccess: false, redir: req.query.redirectTo || ''})
})

router.post('/1', express.urlencoded(), (req, res) => {
  res.render(`ex1`, { cspIsSet: req.exSetPolicy, isPost: true, isSuccess: false, redir: req.query.redirectTo || ''})
})

router.post('/1/exploited', express.urlencoded(), (req, res) => {
  if(req.body.username && req.body.password) {
    res.render(`ex1`, { cspIsSet: req.exSetPolicy, isPost: true, isSuccess: true, redir: req.query.redirectTo || '' })  
  } else {
    res.status(404).send('Page not found')
  }
})

module.exports = router