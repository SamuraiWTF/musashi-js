require('dotenv').config()

const corsApiPort = process.env.CORS_API_PORT || 3020;
const corsClientPort = process.env.CORS_CLIENT_PORT || 3021;

const corsApi = require('./api.cors.demo/app');
const corsClient = require('./client.cors.demo/app');

corsApi.listen(corsApiPort, () =>
  console.log(`CORS demo API server listening on port ${corsApiPort}`)
);

corsClient.listen(corsClientPort, () =>
  console.log(`CORS demo client available on port ${corsClientPort}`)
);
