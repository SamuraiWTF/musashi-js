const crypto = require('crypto')

const generateNonce = (_, res, next) => {
  let nonce = crypto.randomBytes(16).toString('hex');
  res.nonce = nonce;
  next()
}

module.exports = generateNonce;