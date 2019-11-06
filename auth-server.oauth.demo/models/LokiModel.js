const Loki = require('lokijs')

class LokiModel {
  constructor () {
    // This would be an issue if multiple we instantiated.
    this.db = new Loki(`oauth_${LokiModel.__count}.json`)
    this.db.addCollection('clients')
    this.db.addCollection('tokens')
    this.db.addCollection('users')

    LokiModel.__count++
  }

  dump () {
    console.log('clients', this.db.clients)
    console.log('tokens', this.db.clients)
    console.log('users', this.db.users)
  }

  getAccessToken (bearerToken) {
    return this.db.tokens.findOne({ accessToken: bearerToken })
  }

  getClient (clientId, clientSecret) {
    return this.db.clients.findOne({ clientId: clientId, clientSecret: clientSecret })
  }

  getRefreshToken (refreshToken) {
    return this.db.tokens.findOne({ refreshToken: refreshToken })
  }

  getUser (username, password) {
    return this.db.users.findOne({ username: username, password: password })
  }

  saveToken (token, client, user) {
    this.db.tokens.insert({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: client.clientId,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      userId: user.id
    })
  }
}

LokiModel.__count = 0

module.exports = LokiModel
