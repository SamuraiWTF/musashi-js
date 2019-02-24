const express = require("express");
const app = express();

app.get('/', (req, res) => res.send('Hello OAuth Provider!'))

module.exports = app;