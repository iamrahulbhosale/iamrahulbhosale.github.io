module.exports = {
  // this is a simple selector to the element that says 'Error'
  'pretty-error > header > title > kind': {
    // which we can hide:
    display: 'none'
  },

  // the 'colon' after 'Error':
  'pretty-error > header > colon': {
    // we hide that too:
    display: 'none'
  },

  // our error message
  'pretty-error > header > message': {
    // let's change its color:
    color: 'bright-white',

    // we can use black, red, green, yellow, blue, magenta, cyan, white,
    // grey, bright-red, bright-green, bright-yellow, bright-blue,
    // bright-magenta, bright-cyan, and bright-white

    // we can also change the background color:
    background: 'red',

    // it understands paddings too!
    padding: '0 1' // top/bottom left/right
  },

  // each trace item ...
  'pretty-error > trace > item': {
    marginLeft: 3,
    bullet: '"<grey>o</grey>"'
  },

  'pretty-error > trace > item > header > pointer > file': {
    color: 'bright-red'
  },

  'pretty-error > trace > item > header > pointer > colon': {
    color: 'cyan'
  },

  'pretty-error > trace > item > header > pointer > line': {
    color: 'bright-cyan'
  },

  'pretty-error > trace > item > header > what': {
    color: 'bright-white'
  },

  'pretty-error > trace > item > footer > addr': {
    color: 'grey'
  }
}
