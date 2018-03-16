import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'react-router-redux'

import App from 'containers/App'

import './Root.styl'

export default class RootContainer extends Component {
  componentDidMount = () => {
    if (__SERVER__) {
      return
    }
    this.updateNetworkStatus()
    window.addEventListener('online', this.updateNetworkStatus)
    window.addEventListener('offline', this.updateNetworkStatus)
  }

  componentWillUnmount = () => {
    if (__SERVER__) {
      return
    }
    window.removeEventListener('online', this.updateNetworkStatus)
    window.removeEventListener('offline', this.updateNetworkStatus)
  }

  updateNetworkStatus = () => {
    console.log('Navigator is offline: ', !navigator.onLine)
    document.body.classList.toggle('is-offline', !navigator.onLine)
  }

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
