import { createStore, combineReducers } from 'redux'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export const store = createStore(
  combineReducers({
    routing: routerReducer
  })
)

export const history = syncHistoryWithStore(hashHistory, store)
