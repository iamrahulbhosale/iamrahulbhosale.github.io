/**
 * scrollToElement
 * smoothly scrolls to element/selector give in target parameter
 *
 * @param {jQueryElement | Element | String} $target
 * @param {boolean} [$container=false]
 * @param {number} [duration=600]
 * @returns
 */
export function scrollToElement(target, options = {}) {
  options.container = options.container || $('html, body')
  options.duration = options.duration || 600
  options.offset = options.offset || 0

  if (!target) return console.warn('Cannot scroll to invalid target: ', target)

  const $container = $(options.container)
  const $target = $(target)

  const top = $target.offset().top
  let shift = top < options.offset ? 0 : top + options.offset

  console.log('Gonna shift: ', shift)

  $container.stop().animate(
    {
      scrollTop: shift
    },
    options.duration
  )

  return false
}

export function getDeviceWidth() {
  return document.documentElement.clientWidth
}

// Can be safely used inside forms if the form does not contain
// input[type='button']
// declare all your buttons with `button` tag. it's a better practice.
export function focusNextInputOnEnter(e, containerEl) {
  // Break on all keys that are not "Enter" key
  if (e.which !== 13) {
    return
  }

  var currentInput = e.currentTarget
  var nextInput
  const inputs = containerEl.querySelectorAll('input')
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].isSameNode(currentInput)) {
      nextInput = inputs[i + 1]
    }
  }

  if (nextInput) {
    nextInput.focus()
  }
}
