require('dotenv').config()

const corsApiPort = process.env.CORS_API_PORT || 3020
const corsClientPort = process.env.CORS_CLIENT_PORT || 3021
// const oauthProviderPort = process.env.OAUTH_PROVIDER_PORT || 3030
// const oauthClientPort = process.env.OAUTH_CLIENT_PORT || 3031
const cspAppPort = process.env.CSP_APP_PORT || 3041
const jwtPort = process.env.JWT_PORT || 3050
const keystore = process.env.KEYSTORE_FILE
const keystorePassphrase = process.env.KEYSTORE_PASS

const corsApi = require('./api.cors.demo/app')
const corsClient = require('./client.cors.demo/app')
// const oauthProvider = require('./auth-server.oauth.demo/app')
// const oauthClient = require('./client.oauth.demo/app')
const cspClient = require('./csp.demo/app')
const jwt = require('./jwt.demo/app')
const fs = require('fs')
const https = require('https')

if (keystore && keystorePassphrase) {
  let tlsOptions = { pfx: fs.readFileSync(keystore), passphrase: keystorePassphrase }
  https.createServer(tlsOptions, corsApi).listen(corsApiPort)
  console.log(`TLS CORS demo API server listening on port ${corsApiPort}`)
  https.createServer(tlsOptions, corsClient).listen(corsClientPort)
  console.log(`TLS CORS demo client available on port ${corsClientPort}`)
} else {
  corsApi.listen(corsApiPort, () =>
    console.log(`CORS demo API server listening on port ${corsApiPort}`)
  )

  corsClient.listen(corsClientPort, () =>
    console.log(`CORS demo client available on port ${corsClientPort}`)
  )
}

/* oauthProvider.listen(oauthProviderPort, () =>
  console.log(`OAuth demo provider available on port ${oauthProviderPort}`)
)

oauthClient.listen(oauthClientPort, () =>
  console.log(`OAuth demo client available on port ${oauthClientPort}`)
) */

cspClient.listen(cspAppPort, () =>
  console.log(`CSP demo app available on port ${cspAppPort}`)
)

jwt.listen(jwtPort, () =>
  console.log(`JWT demo app available on port ${jwtPort}`)
)
