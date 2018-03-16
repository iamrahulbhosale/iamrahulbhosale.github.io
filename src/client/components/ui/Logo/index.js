import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import s from './Logo.styl'

const Logo = ({ className, white, onClick }) => {
  const cx = classnames(s.container, className)

  const imageSrc = white
    ? '/public/img/logo-white.svg'
    : '/public/img/logo-black.svg'

  return (
    <div className={cx} onClick={onClick}>
      <img className="ui-logo-img" alt="" src={imageSrc} />
    </div>
  )
}

Logo.defaultProps = {
  white: false
}
Logo.propTypes = {
  white: PropTypes.bool
}

export default Logo
