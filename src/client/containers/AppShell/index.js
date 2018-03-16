import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

class AppShell extends Component {
  state = {
    isSidebarOpen: false
  }

  closeSidebar = () => {
    this.setState({ isSidebarOpen: false })
  }

  openSidebar = () => {
    this.setState({ isSidebarOpen: true })
  }

  render() {
    const cx = classnames('app-shell', this.props.className)
    return (
      <div className={cx}>
        <Header {...this.props.headerProps} onMenuClick={this.openSidebar} />
        <Sidebar
          {...this.props.sidebarProps}
          isOpen={this.state.isSidebarOpen}
          onRequestClose={this.closeSidebar}
        />
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
