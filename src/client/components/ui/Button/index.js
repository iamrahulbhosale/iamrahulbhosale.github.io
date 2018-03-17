import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './Button.styl'

import noop from 'lodash/noop'

const Button = props => {
  const {
    isLoading,
    loadingText,
    className,
    children,
    innerRef,
    ...otherProps
  } = props

  const cx = classnames(s.container, 'ui-button', className, {
    'is-loading': isLoading
  })

  const joinRef = innerRef || noop

  return (
    <button className={cx} {...otherProps} ref={joinRef}>
      {isLoading ? loadingText : children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  classname: PropTypes.string,
  isLoading: PropTypes.bool
}

Button.defaultProps = {
  isLoading: false
}

export default Button
