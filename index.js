require('dotenv').config()

const corsApiPort = process.env.CORS_API_PORT || 3020
const corsClientPort = process.env.CORS_CLIENT_PORT || 3021
const oauthProviderPort = process.env.OAUTH_PROVIDER_PORT || 3030
const oauthClientPort = process.env.OAUTH_CLIENT_PORT || 3031
const cspAppPort = process.env.CSP_APP_PORT || 3041

const corsApi = require('./api.cors.demo/app')
const corsClient = require('./client.cors.demo/app')
// const oauthProvider = require('./auth-server.oauth.demo/app')
// const oauthClient = require('./client.oauth.demo/app')
const cspClient = require('./csp.demo/app')

corsApi.listen(corsApiPort, () =>
  console.log(`CORS demo API server listening on port ${corsApiPort}`)
)

corsClient.listen(corsClientPort, () =>
  console.log(`CORS demo client available on port ${corsClientPort}`)
)

/*oauthProvider.listen(oauthProviderPort, () =>
  console.log(`OAuth demo provider available on port ${oauthProviderPort}`)
)

oauthClient.listen(oauthClientPort, () =>
  console.log(`OAuth demo client available on port ${oauthClientPort}`)
)*/

cspClient.listen(cspAppPort, () =>
  console.log(`CSP demo app available on port ${cspAppPort}`)
)
