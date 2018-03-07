import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const debug = require('debug')('react-app:approutes')

const AuthRoute = props => {
  var authState = props.auth
  var validations = []

  debug(`AuthRoute: validating ${props.path}`)

  if (props.authUserType) {
    validations.push(props.authUserType === authState.userType)
    debug(
      `  AuthRoute:authUserType`,
      validations[0],
      props.authUserType,
      authState.userType
    )
  }

  // [TODO: switch to a better token validation than existence check]
  if (props.authHasToken) {
    let isTokenValid = !!authState.authToken
    validations.push(isTokenValid)
    debug(`  AuthRoute:authHasToken`, isTokenValid)
  }

  const isValid = validations.every(x => x === true)
  debug(`Final Validation: `, isValid)

  return isValid ? (
    <Switch location={props.location}>
      <Route path={props.path} component={props.component} />
    </Switch>
  ) : (
    <Redirect to="/" />
  )
}

// PropTypes
AuthRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  authUserType: PropTypes.oneOf(['chef', 'restaurant']),
  authHasToken: PropTypes.bool
}

export default AuthRoute
