/* @flow */

import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { createReducer } from 'redux-create-reducer'

/* :: import type { ReducerState, RootState } from '../../../types.js' */

const initialState = fromJS({
  locationBeforeTransitions: null
})

export default createReducer(initialState, {
  [LOCATION_CHANGE] (state /* : ReducerState */, action) {
    return state.merge({
      locationBeforeTransitions: action.payload
    })
  }
})

export const getRouting = (state /* : RootState */) => state.get('routing')
