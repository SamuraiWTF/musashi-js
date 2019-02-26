const express = require('express')
const router = express.Router()

const cors = require('cors')
const sessionLoader = require('../middleware/cookieSessionLoader')
const sessionBouncer = require('../middleware/cookieSessionBouncer')

const dataCtrlr = require('../controllers/data')

const corsOptions = {
  origin: true,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}
router.use(cors(corsOptions))

router.use(sessionLoader)
router.use(sessionBouncer)

router.options('*', cors(corsOptions))
router.get('/object', dataCtrlr.listObjects)
router.post('/object', dataCtrlr.createObject)
router.get('/object/:uid', dataCtrlr.readObject)
router.put('/object/:uid', dataCtrlr.updateObject)
router.delete('/object/:uid', dataCtrlr.deleteObject)

module.exports = router
