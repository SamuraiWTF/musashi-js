const express = require("express");
const bodyParser = require('body-parser');
const OAuthServer = require('express-oauth-server');
const app = express();
const LokiModel = require('./models/LokiModel');

app.oauth = new OAuthServer({ model: new LokiModel(), debug: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false }));
app.use(app.oauth.authorize());

app.get('/', (req, res) => res.send('Hello OAuth Provider!'))

module.exports = app;