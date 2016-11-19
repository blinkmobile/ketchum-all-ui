import { Map, OrderedSet } from 'immutable'
import { createReducer } from 'redux-create-reducer'

export const createCollectionReducer = (type) => {
  const initialState = new Map({
    byId: new Map(),
    ids: new OrderedSet()
  })

  return createReducer(initialState, {
    [`${type}_CREATE`] (state, action) {
      return new Map({
        byId: state.byId.set(action.payload.id, action.payload),
        ids: state.ids.add(action.payload.id)
      })
    },

    [`${type}_UPDATE`] (state, action) {
      return state.byId.mergeIn([ action.payload.id ], action.payload)
    },

    [`${type}_DELETE`] (state, action) {
      return new Map({
        byId: state.byId.delete(action.payload.id),
        ids: state.ids.delete(action.payload.id)
      })
    }
  })
}
