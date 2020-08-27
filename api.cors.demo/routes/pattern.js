const express = require('express')
const router = express.Router()
const authSubRouter = express.Router({ mergeParams: true })

const cors = require('cors')
const sessionLoader = require('../middleware/cookieSessionLoader')
const sessionBouncer = require('../middleware/cookieSessionBouncer')

const dataCtrlr = require('../controllers/data')

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const corsOptions = {
  origin: new RegExp('https?:\\/\\/([0-9a-z\\.\\-]+\\.)?' + escapeRegex(process.env.CORS_CLIENT_HOST) + '$'),
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}
console.log('corsOptions:', corsOptions);
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
