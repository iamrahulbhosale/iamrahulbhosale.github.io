import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import Social from './Social'

export default combineReducers({
  router: routerReducer,
  Social
})
