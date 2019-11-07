const headers = (headerMap) => {
  return (req, res, next) => {
    res.set(headerMap)
    next()
  }
}

module.exports = headers;