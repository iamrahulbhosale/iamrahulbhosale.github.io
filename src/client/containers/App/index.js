import React, { Component, Fragment } from 'react'
// import classnames from 'classnames'

import { connect } from 'react-redux'

import AppRoutes from './AppRoutes'
import AppOverlays from './AppOverlays'

// Overlays should be rendered aside to routes,
// so user can always have an option to go back
// to whatever page they were on

class App extends Component {
  render() {
    return (
      <Fragment>
        {AppRoutes(this.props.location, this.props.auth)}
        {AppOverlays(this.props.location, this.props.auth)}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
  auth: state.Auth
})

export default connect(mapStateToProps)(App)
