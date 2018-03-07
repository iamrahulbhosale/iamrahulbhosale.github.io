import React from 'react'
import ReactDOM from 'react-dom/server'
// import streamToPromise from 'stream-to-promise'

import { StaticRouter } from 'react-router'
import Root from '../../client/containers/Root'

const generateHTML = context => {
  const renderContext = {}

  const renderFn = context.streamingRender
    ? ReactDOM.renderToNodeStream
    : ReactDOM.renderToString

  context.html = renderFn(
    <StaticRouter location={context.req.url} context={renderContext}>
      <Root store={context.store} history={context.history} />
    </StaticRouter>
  )

  context.renderContext = renderContext
  return context
}

export default function renderPage(context) {
  return generateHTML(context)
}
