const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

const mergeFromIndex = (breakpoints, values) => {
  return breakpoints.map((x, i) => [x, values[i]])
}

const filterFalsy = responsivePair => {
  const value = responsivePair[1]
  if (Number.isInteger(value) && value === 0) return true
  return !!value
}

export const toStringWithPrefix = (prefix, values) => {
  return mergeFromIndex(breakpoints, values)
    .filter(filterFalsy)
    .reduce((cx, x) => {
      return `${cx} ${prefix}-${x[0]}-${x[1]}`
    }, '')
}

// Expands column set
export const cols = (...args) => {
  return toStringWithPrefix('col', args)
}
