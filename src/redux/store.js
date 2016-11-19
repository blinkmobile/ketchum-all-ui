import { createStore } from 'redux'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createSelector } from 'reselect'

import reducer from './reducer.js'
import { getRouting } from './reducers/routing.js'

export const store = createStore(reducer)

export const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: createSelector(getRouting, (routing) => routing.toJS())
})
