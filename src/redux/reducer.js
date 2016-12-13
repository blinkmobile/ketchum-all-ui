/* @flow */

import { reducer as formReducer } from 'redux-form/immutable'
import { combineReducers } from 'redux-immutable'

import auth from './reducers/auth.js'
import cloudaccounts from './reducers/cloudaccounts.js'
import projects from './reducers/projects.js'
import routing from './reducers/routing.js'
import services from './reducers/services.js'
import solutions from './reducers/solutions.js'
import tenants from './reducers/tenants.js'

export default combineReducers({
  auth,
  cloudaccounts,
  form: formReducer,
  projects,
  routing,
  services,
  solutions,
  tenants
})
