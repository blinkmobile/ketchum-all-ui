/* @flow */

import localForage from 'localforage/dist/localforage.nopromises.js'
import { applyMiddleware, createStore, compose } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist-immutable'
import ReduxThunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { createSelector } from 'reselect'

import reducer from './reducer.js'
import { getRouting } from './reducers/routing.js'

const middleware = [
  routerMiddleware(hashHistory),
  ReduxThunk
]

const composeEnhancers = (
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

export const store = createStore(
  reducer,
  undefined,
  composeEnhancers(
    autoRehydrate(),
    applyMiddleware(...middleware),
  )
)

persistStore(store, { storage: localForage })

export const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: createSelector(getRouting, (routing) => routing.toJS())
})
