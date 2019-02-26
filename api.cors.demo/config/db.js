const Loki = require('lokijs')

const db = new Loki('db.json')

exports.objects = db.addCollection('objects')
exports.session = db.addCollection('session')
