import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './Button.styl'

const Button = props => {
  const { isLoading, loadingText, className, children, ...otherProps } = props

  const cx = classnames(s.container, 'ui-button', className, {
    'is-loading': isLoading
  })

  return (
    <button className={cx} {...otherProps}>
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
