import isObject from 'lodash/isObject' // eslint-disable-line

//eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const isEmail = str => {
  return EMAIL_REGEX.test(str)
}

// Checks if a username is valid
export const isUsernameInvalid = str => {
  return str.length >= 6 ? '' : 'Username cannot be less than 6 characters'
}

// Checks if a password is valid
// we check for string length right now, but we can expand it to disallow/allow special characters later
export const isPasswordInvalid = str => {
  return str.length >= 6 ? '' : 'Password cannot be less than 6 characters'
}

// Checks props.children is falsy
export const areChildrenFalsy = children => {
  if (!children) return true
  if (Array.isArray(children) && children.length === 0) {
    return true
  }
  if (isObject(children) && Object.keys(children).length === 0) {
    return true
  }
  return false
}
