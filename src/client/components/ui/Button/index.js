import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './Button.styl'

const Button = props => {
  const {
    outline,
    link,
    primary,
    rect,
    isLoading,
    loadingText,
    sm,
    lg,
    medium,
    className,
    children,
    ...otherProps
  } = props

  const cx = classnames(s.container, 'ui-button', className, {
    'is-primary': primary,
    'is-outline': outline,
    'is-link': link,
    'is-rect': rect,
    'is-sm': sm,
    'is-lg': lg,
    'is-loading': isLoading,
    'is-medium': medium
  })

  return (
    <button className={cx} {...otherProps}>
      {isLoading ? loadingText : children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  outline: PropTypes.bool,
  classname: PropTypes.string,
  primary: PropTypes.bool,
  link: PropTypes.bool,
  rect: PropTypes.bool,
  isLoading: PropTypes.bool
}

Button.defaultProps = {
  outline: false,
  primary: false,
  link: false,
  sm: false,
  lg: false,
  medium: false,
  rect: false,
  isLoading: false
}

export default Button
