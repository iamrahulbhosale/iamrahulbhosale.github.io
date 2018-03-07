import React from 'react'
import { Route } from 'react-router-dom'

import AsyncComponent from './async-component'

export default function AsyncRoute({ component, ...otherProps }) {
  return <Route component={AsyncComponent(component)} {...otherProps} />
}
