import _ from 'lodash'
import path from 'path'
import fs from 'fs'

//eslint-disable-next-line no-unused-vars
import { printAsTable } from 'helpers/common'

import Paths from '../../../tools/paths'

const debug = require('debug')('react-app:server:config')

const SAFE_KEYS_FOR_CLIENT = ['API_BASE']

export var Config = {}

export const initConfig = app => {
  // Path is dynamically resolved when this function is called
  // e.g. '.'  will point to build/server.bundle.js
  var p = path.resolve('.', './config.js')
  debug(`Loading config from: ${p}`)
  try {
    Config = Object.assign(Config, eval(fs.readFileSync(p, 'utf-8'))) //eslint-disable-line no-eval
  } catch (e) {
    throw e
  }

  Config.Paths = Paths

  // debug('Loaded Config.')
  // printAsTable(Config)

  // Expose config to middlewares
  app.set('app_config', Config)

  // Expose for SSR
  global.INIT_CONFIG = Config

  return Promise.resolve(app)
}

export function get(key) {
  return Config[key]
}

export const getConfigForClient = () => {
  return _.pick(Config, ...SAFE_KEYS_FOR_CLIENT)
}
