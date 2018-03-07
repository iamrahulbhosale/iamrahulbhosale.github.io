import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'react-router-redux'

import App from 'containers/App'

import './Root.styl'

export default class RootContainer extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <App renderCounter={this.props.renderCounter} />
        </ConnectedRouter>
      </Provider>
    )
  }
}
