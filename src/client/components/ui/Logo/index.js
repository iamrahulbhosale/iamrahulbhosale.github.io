import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import s from './Logo.styl'

const Logo = ({ className, noText, primaryText, secondaryText, onClick }) => {
  const cx = classnames(
    s.container,
    'flex-horizontal a-center',
    {
      'no-text': noText
    },
    className
  )
  return (
    <div className={cx} onClick={onClick}>
      <div className="ui-logo-img">
        <i className="material-icons">menu</i>
      </div>
      {!!primaryText && <span className="ui-logo-text">{primaryText}</span>}
      {!!secondaryText && (
        <span className="ui-logo-text text-primary">{secondaryText}</span>
      )}
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
