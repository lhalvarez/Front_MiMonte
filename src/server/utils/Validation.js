/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// eslint-disable-next-line prettier/prettier

module.exports.isEmptyJSON = obj => {
  for (var i in obj) {
    return 0
  }
  return 1
}

module.exports.isHTML = text => {
  var value = text.toString()
  var htmlObjVal = '{'
  var htmlArrVal = '['
  if (
    value === 'null' ||
    value === 'Error' ||
    value === 'Not Found' ||
    (value.charAt(0) !== htmlObjVal && value.charAt(0) !== htmlArrVal)
  ) {
    return 1
  }
  return 0
}
