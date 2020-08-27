const policySet = (req, res, next) => {
  /*console.log('cookie', req.cookies['cspLastSetBy'])
  console.log('compareTo', `${req.protocol}://${req.header('host')}/ex${req.path}`)*/
  req.exSetPolicy = req.cookies['cspLastSetBy'] === `${req.protocol}://${req.header('host')}/ex${req.path}`
  //console.log('req.exSetPolicy', req.exSetPolicy)
  next()
}

module.exports = policySet