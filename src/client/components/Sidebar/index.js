import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './Sidebar.styl'

import Navigation from 'components/Header/Navigation'

const Sidebar = props => {
  const { className } = props

  const cx = classnames(s.container, className, {
    'is-open': props.isOpen
  })

  return (
    <div className={cx}>
      <div className="sidebar-inner">
        <Navigation />
      </div>
      <div className="sidebar-backdrop" onClick={props.onRequestClose} />
    </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

Sidebar.defaultProps = {
  isOpen: false
}

export default Sidebar
