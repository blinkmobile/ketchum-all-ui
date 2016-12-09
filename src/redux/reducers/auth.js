/* @flow */

import { fromJS } from 'immutable'
import { createReducer } from 'redux-create-reducer'

import { LOG_IN, LOG_OUT } from '../actions/auth.js'

const initialState = fromJS({
  token: ''
})

export default createReducer(initialState, {
  [LOG_IN] (state, action) {
    return state.merge({
      token: action.payload
    })
  },

  [LOG_OUT] (state, action) {
    return state.merge({
      token: ''
    })
  }
})

export const getToken = (state) => state.getIn([ 'auth', 'token' ])
