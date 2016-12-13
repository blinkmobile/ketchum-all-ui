/* @flow */

import { fromJS } from 'immutable'
import { createReducer } from 'redux-create-reducer'

/* :: import type { ReducerState, RootState } from '../../../types.js' */

import { LOG_IN, LOG_OUT } from '../actions/auth.js'

const initialState = fromJS({
  token: ''
})

export default createReducer(initialState, {
  [LOG_IN] (
    state /* : ReducerState */,
    action
  ) /* : ReducerState */ {
    return state.merge({
      token: action.payload
    })
  },

  [LOG_OUT] (
    state /* : ReducerState */,
    action
  ) /* : ReducerState */ {
    return state.merge({
      token: ''
    })
  }
})

export const getToken = (state /* : RootState */) /* : string */ => state.getIn([ 'auth', 'token' ]) || ''
