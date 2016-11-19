import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { createReducer } from 'redux-create-reducer'

const initialState = fromJS({
  locationBeforeTransitions: null
})

export default createReducer(initialState, {
  [LOCATION_CHANGE] (state, action) {
    return state.merge({
      locationBeforeTransitions: action.payload
    })
  }
})

export const getRouting = (state) => state.get('routing')
