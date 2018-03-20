const { exec } = require('child_process')
const chalk = require('chalk')

// Dont run if these are supplied in cmd
const IGNORE_LIST = ['rm -rf /']

const shouldIgnoreCommand = cmd => {
  const dangerous = IGNORE_LIST.some(x => cmd === x)
  if (dangerous) return true

  const cleanedPath = cmd.replace(process.cwd(), '') //eslint-disable-line no-unused-vars
  if (cmd.includes('curl')) {
    return false
  }
  // Stop if command is not targeted in project directory
  return !cmd.includes(process.cwd())
}

const run = (cmd = false, log = false) => {
  if (!cmd || typeof cmd !== 'string')
    return Promise.reject(
      new Error('Invalid command. Should only be a string.')
    )

  if (shouldIgnoreCommand(cmd))
    return Promise.reject(
      new Error('run:IGNORE_LIST has similar command ' + cmd)
    )

  return new Promise((res, rej) => {
    console.log(
      chalk.cyan(`Running command: `) +
        chalk.yellow(cmd.replace(process.cwd() + '/', './'))
    )
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return rej(err)
      }

      log && stdout.length && console.log(stdout)
      log && stderr.length && console.log(stderr)
      res({ stdout, stderr })
    })
  })
}

module.exports = {
  run
}
