const express = require("express");
const client = express();

client.use(express.static("client.cors.demo/static"));

module.exports = client;