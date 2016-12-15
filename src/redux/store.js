/* @flow */

import { applyMiddleware, createStore, compose } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist-immutable'
import ReduxThunk from 'redux-thunk'
import { createMemoryHistory, hashHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { createSelector } from 'reselect'

import reducer from './reducer.js'
import { getRouting } from './reducers/routing.js'

const isStorageAvailable = !!(global.indexedDB || global.localStorage)

const routerHistory = process.env.NODE_ENV === 'test' ? createMemoryHistory() : hashHistory

const middleware = [
  routerMiddleware(routerHistory),
  ReduxThunk
]

const enhancers = [
  applyMiddleware(...middleware)
]

if (isStorageAvailable) {
  enhancers.push(autoRehydrate())
}

const composeEnhancers = (
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

export const store = createStore(
  reducer,
  undefined,
  composeEnhancers(...enhancers)
)

if (isStorageAvailable) {
  const localForage = require('localforage/dist/localforage.nopromises.js')
  persistStore(store, { storage: localForage })
}

export const history = syncHistoryWithStore(routerHistory, store, {
  selectLocationState: createSelector(getRouting, (routing) => routing.toJS())
})
