import React, { Component } from 'react'

import createMemoryHistory from 'history/createMemoryHistory'

import { configureStore } from 'store/index'
import Root from 'containers/Root'

import $ from 'jquery'

window.$ = window.jQuery = $

const history = createMemoryHistory()
const store = configureStore({}, history)

export default class StyleGuidistWrapper extends Component {
  componentDidMount = () => {
    if (window.NProgress && typeof window.NProgress.done === 'function') {
      window.NProgress.done()
    }
  }
  render() {
    return <Root history={history} store={store} />
  }
}
