const express = require('express')

const router = express.Router();

const dummyController = require('../controllers/dummy')

const cors = require('cors')

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// ex1 - missing start anchor
const ex1router = express.Router({ mergeParams: true })

const ex1Policy = {
    origin: new RegExp(escapeRegex(process.env.CORS_CLIENT_HOST) + '$'),
    methods: 'GET,POST',
    credentials: true
}

ex1router.use(cors(ex1Policy))
ex1router.options('*', cors(ex1Policy))

ex1router.get('/1', dummyController.getData)

// ex2 - missing end anchor
const ex2router = express.Router({ mergeParams: true })

const ex2Policy = {
    origin: new RegExp('^https?:\\/\\/(www\\.|blog\\.)?professionallyevil.com'),
    methods: 'GET,POST',
    credentials: true
}

ex2router.use(cors(ex2Policy))
ex2router.options('*', cors(ex2Policy))

ex2router.get('/2', dummyController.getData)

router.use(ex1router)
router.use(ex2router)

module.exports = router