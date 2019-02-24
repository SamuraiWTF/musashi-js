require('dotenv').config()

const express = require("express");

const cookieParser = require("cookie-parser");

const api = express();

const client = express();

const apiHttpPort = process.env.CORS_API_PORT;
const clientHttpPort = process.env.CORS_CLIENT_PORT;

api.use(express.json({ type: "*/*" }));
api.use(cookieParser());

client.use(express.static("client.cors.demo"));

//Add CORS routes
api.use("/auth", require("./server.cors.demo/routes/auth"));
api.use("/sop", require("./server.cors.demo/routes/sop"));
api.use("/pattern", require("./server.cors.demo/routes/pattern"));
api.use("/reflect", require("./server.cors.demo/routes/reflect"));

api.listen(apiHttpPort, () =>
  console.log(`cors.dem server listening on port ${apiHttpPort}`)
);

client.listen(clientHttpPort, () =>
  console.log(`cors.dem client available on port ${clientHttpPort}`)
);
