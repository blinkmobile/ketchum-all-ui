import { fromJS, Map, OrderedSet } from 'immutable'
import { createReducer } from 'redux-create-reducer'

export const createCollectionReducer = (type) => {
  type = type.toLowerCase()
  const TYPE = type.toUpperCase()

  const initialState = new Map({
    byId: new Map(),
    ids: new OrderedSet()
  })

  return createReducer(initialState, {
    [`${TYPE}_CREATE`] (state, { payload }) {
      return new Map({
        byId: state.get('byId').set(payload.id, fromJS(payload)),
        ids: state.get('ids').add(payload.id)
      })
    },

    [`${TYPE}_UPDATE`] (state, { payload }) {
      return state.mergeIn([ 'byId', payload.id ], fromJS(payload))
    },

    [`${TYPE}_DELETE`] (state, { payload: { id } }) {
      return new Map({
        byId: state.get('byId').delete(id),
        ids: state.get('ids').delete(id)
      })
    }
  })
}
