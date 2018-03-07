const configPath = process.env.DIST_MODE === '1' ? '.env.dist' : '.env'

// Set environment variables
require('dotenv').config({ path: configPath })

// Take only namespaced keys in config
var Config = Object.keys(process.env)
  .sort()
  .reduce((result, keyname) => {
    if (keyname.includes('REACT_APP_'))
      result[keyname.replace('REACT_APP_', '')] = process.env[keyname]
    return result
  }, {})

if (!Object.keys(Config).length) {
  let msg = [
    'Empty Config.',
    'You probably forgot to add variables in your .env',
    'or dotenv/config was not called properly.',
    `NODE_ENV was '${process.env.NODE_ENV}'`
  ]
  throw new Error(msg.join('\n'))
}

module.exports = Config
