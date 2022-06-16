exports.passwordValidator = (pwd) => {
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd) && pwd.length >= 6) {
    return true
  } else {
    return false
  }
}
