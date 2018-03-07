/*eslint-env browser*/
import React from 'react'
import { render, hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

//eslint-disable-next-line no-unused-vars
import { configureStore, saveLocalState, loadLocalState } from './store/index'

import createHistory from 'history/createBrowserHistory'

import Root from './containers/Root'

// Create Initial History Object
const history = createHistory()

// Check if server sent a dehydrated state
const initialState = window.INITIAL_STATE || {}

// Check if a localState is present
// const localState = loadLocalState() || {}

// Combine the final state
const finalState = {
  // ...localState,
  ...initialState
}

// Initialize our store
const store = configureStore(finalState, history)

// Save a local copy whenever store changes
// store.subscribe(() => {
//   saveLocalState(store.getState())
// })

const onRenderComplete = () => {
  console.timeEnd('react:rendered-in')
  console.log('renderCount: ', renderCounter)
}

var renderCounter = 0
const renderApp = Component => {
  const renderFn = !!module.hot ? render : hydrate
  console.time('react:rendered-in')
  renderFn(
    <AppContainer>
      <Component
        history={history}
        store={store}
        renderCounter={++renderCounter}
      />
    </AppContainer>,
    document.getElementById('root'),
    onRenderComplete
  )
}

// Render the app for first time
renderApp(Root)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    renderApp(Root)
  })
}
