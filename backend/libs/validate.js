

exports.validEmail = (value) => {
  if(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(value)) {
    return true
  } else {
    return false
  }
}
