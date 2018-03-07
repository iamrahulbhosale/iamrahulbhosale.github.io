import React, { Component } from 'react'

export default function createAsyncComponent(getComponent) {
  if (!typeof getComponent === 'function') {
    throw new Error('`getComponent` is not a function')
  }
  return class ProxyComponent extends Component {
    state = {
      isLoading: true,
      error: false,
      comp: null
    }

    componentDidMount() {
      getComponent()
        .then(module => {
          this.setState({ comp: module.default, isLoading: false })
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false })
        })
    }
    render() {
      if (this.state.isLoading) return <div> loading </div>
      if (this.state.error) return <div> got error </div>
      return <this.state.comp {...this.props} />
    }
  }
}
