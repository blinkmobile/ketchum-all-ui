import { combineReducers } from 'redux-immutable'

import projects from './reducers/projects.js'
import routing from './reducers/routing.js'
import services from './reducers/services.js'
import solutions from './reducers/solutions.js'
import tenants from './reducers/tenants.js'

export default combineReducers({
  projects,
  routing,
  services,
  solutions,
  tenants
})
