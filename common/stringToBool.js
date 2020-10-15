module.exports = function stringToBool(str) {
    let test = str.toUpperCase().trim();
    if(["TRUE","Y","YES","1"].indexOf(test) > -1) {
      return true
    } else if (["FALSE","N","NO","0"].indexOf(test) > -1) {
      return false
    } else {
      console.error(`Invalid value in stringToBool: ${str}`)
      return undefined
    }
  }