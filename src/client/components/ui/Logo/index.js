import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import s from './Logo.styl'

const Logo = ({ noText, primaryText, secondaryText }) => {
  const cx = classnames(s.container, 'flex-horizontal a-center', {
    'no-text': noText
  })
  return (
    <div className={cx}>
      <div className="ui-logo-img">
        <i className="material-icons">dashboard</i>
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
