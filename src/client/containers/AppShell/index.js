import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import Header from 'components/Header'

class AppShell extends Component {
  render() {
    const cx = classnames('app-shell', this.props.className)
    return (
      <div className={cx}>
        <Header {...this.props.headerProps} />
        {this.props.children}
      </div>
    )
  }
}

AppShell.propTypes = {
  children: PropTypes.node,
  headerProps: PropTypes.object,
  sidebarProps: PropTypes.object
}

AppShell.defaultProps = {
  headerProps: {},
  sidebarProps: {}
}

export default AppShell
