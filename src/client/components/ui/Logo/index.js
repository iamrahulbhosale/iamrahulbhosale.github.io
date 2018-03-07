import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import s from './Logo.styl'

const Logo = ({ noText }) => {
  const image = '/public/img/logo_icon.svg'
  const cx = classnames(s.container, 'flex-horizontal a-center', {
    'no-text': noText
  })
  return (
    <div className={cx}>
      <img className="ui-logo-img" alt="" src={image} />
      <span className="ui-logo-text text-dark">BRAND</span>
      <span className="ui-logo-text text-primary">LOGO</span>
    </div>
  )
}

Logo.defaultProps = {
  noText: false
}
Logo.propTypes = {
  noText: PropTypes.bool
}

export default Logo
