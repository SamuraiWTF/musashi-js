const express = require('express')
const router = express.Router()

const sessionLoader = require('../middleware/cookieSessionLoader')
const sessionBouncer = require('../middleware/cookieSessionBouncer')

const dataCtrlr = require('../controllers/data')

router.use(sessionLoader)
router.use(sessionBouncer)

router.get('/object', dataCtrlr.listObjects)
router.post('/object', dataCtrlr.createObject)
router.get('/object/:uid', dataCtrlr.readObject)
router.put('/object/:uid', dataCtrlr.updateObject)
router.delete('/object/:uid', dataCtrlr.deleteObject)

module.exports = router
