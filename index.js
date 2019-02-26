require('dotenv').config()

const corsApiPort = process.env.CORS_API_PORT || 3020
const corsClientPort = process.env.CORS_CLIENT_PORT || 3021
const oauthProviderPort = process.env.OAUTH_PROVIDER_PORT || 3030
const oauthClientPort = process.env.OAUTH_CLIENT_PORT || 3031
const cspServerPort = process.env.CSP_SERVER_PORT || 3040
const cspClientPort = process.env.CSP_CLIENT_PORT || 3041

const corsApi = require('./api.cors.demo/app')
const corsClient = require('./client.cors.demo/app')
const oauthProvider = require('./provider.oauth.demo/app')
const oauthClient = require('./client.oauth.demo/app')
const cspServer = require('./server.csp.demo/app')
const cspClient = require('./client.csp.demo/app')

corsApi.listen(corsApiPort, () =>
  console.log(`CORS demo API server listening on port ${corsApiPort}`)
)

corsClient.listen(corsClientPort, () =>
  console.log(`CORS demo client available on port ${corsClientPort}`)
)

oauthProvider.listen(oauthProviderPort, () =>
  console.log(`OAuth demo provider available on port ${oauthProviderPort}`)
)

oauthClient.listen(oauthClientPort, () =>
  console.log(`OAuth demo client available on port ${oauthClientPort}`)
)

cspServer.listen(cspServerPort, () =>
  console.log(`CSP demo server available on port ${cspServerPort}`)
)

cspClient.listen(cspClientPort, () =>
  console.log(`CSP demo client available on port ${cspClientPort}`)
)
