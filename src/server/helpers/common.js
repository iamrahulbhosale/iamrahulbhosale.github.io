import _ from 'lodash'
import fs from 'fs-extra'
import crypto from 'crypto'
import chalk from 'chalk'
import Table from 'easy-table'

import Promise from 'bluebird'

Promise.promisifyAll(fs)

// File Response Cache
export const FILE_RESPONSES_CACHE = {}
export const CachedFileResponse = filePath => {
  const key = createMD5(filePath)

  // If file has been requested before, serve from cache
  if (_.has(FILE_RESPONSES_CACHE, key)) {
    return Promise.resolve(FILE_RESPONSES_CACHE[key])
  }

  // First time the file is requested, we read and store in cache
  return fs.readFileAsync(filePath, 'utf-8').then(text => {
    FILE_RESPONSES_CACHE[key] = text
    console.log(chalk.yellow('Cached File Response: ' + filePath))
    return text
  })
}

export const CachedFileResponseMiddleware = (filePath, mimeType) => (
  req,
  res,
  next
) => {
  CachedFileResponse(filePath)
    .then(file => {
      res.type(mimeType || 'text/plain').send(file)
    })
    .catch(err => next(err))
}

// Generate MD5 hash
export const createMD5 = (str = false) => {
  if (!str) return
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
}

export const printAsTable = obj => {
  var t = new Table()
  Object.keys(obj).forEach(key => {
    t.cell('KEY', key)
    t.cell('VALUE', obj[key].substr(0, 50))
    t.newRow()
  })
  console.log(t.toString())
}
