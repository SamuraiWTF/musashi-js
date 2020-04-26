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

router.get('/2', (req, res) => {
  res.render(`ex2`, {cspIsSet: req.exSetPolicy, isPost: false, isSuccess: false, emailAddr: '' });
});

router.post('/2', express.urlencoded(), (req, res) => {
  if(req.body.email) {
    if(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(req.body.email)) {
      res.render(`ex2`, {cspIsSet: req.exSetPolicy, isPost: true, isSuccess: false, emailAddr: '', message: 'If the supplied email matches a valid user in this app, an email will be sent with reset instructions.'});
    } else {
      res.render(`ex2`, {cspIsSet: req.exSetPolicy, isPost: true, isSuccess: false, emailAddr: req.body.email, message: 'The supplied email address appeared to be improperly formatted.' });
    }
  } else {
    res.render(`ex2`, {cspIsSet: req.exSetPolicy, isPost: true, isSuccess: false, emailAddr: ''});
  }
});

module.exports = router