const express = require('express')
const router = express.Router()
const authSubRouter = express.Router({ mergeParams: true })

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

authSubRouter.use(sessionLoader)
authSubRouter.use(sessionBouncer)

router.options('*', cors(corsOptions))

authSubRouter.get('/object', dataCtrlr.listObjects)
authSubRouter.post('/object', dataCtrlr.createObject)
authSubRouter.get('/object/:uid', dataCtrlr.readObject)
authSubRouter.put('/object/:uid', dataCtrlr.updateObject)
authSubRouter.delete('/object/:uid', dataCtrlr.deleteObject)

router.use(authSubRouter)

module.exports = router
