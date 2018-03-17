const DEFAULT_OPTIONS = {
  animation: 'fixed-parallax',
  sectionClass: '.cd-section'
}

function getContainer(containerClass) {
  if (!containerClass || typeof containerClass !== 'string') {
    throw new Error('Cannot initialize without containerClass')
  }

  const containerEl = document.querySelectorAll(containerClass)[0]

  if (!containerEl) {
    throw new Error('Container not found: classname -> ' + containerClass)
  }

  return containerEl
}

export default function initScrollEffect(
  containerClass,
  options = DEFAULT_OPTIONS
) {
  // Handle SSR
  if (__SERVER__) return

  const containerEl = getContainer(containerClass)

  const sections = containerEl.querySelectorAll(options.sectionClass)
}
