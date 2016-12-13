import { fromJS, Map, OrderedSet, Set } from 'immutable'
import { createReducer } from 'redux-create-reducer'

export const createCollectionReducer = (type) => {
  type = type.toLowerCase()
  const TYPE = type.toUpperCase()

  const initialState = new Map({
    byId: new Map(),
    ids: new OrderedSet(),
    selected: new Set()
  })

  return createReducer(initialState, {
    [`${TYPE}_CREATE`] (state, { payload }) {
      return state.merge({
        byId: state.get('byId').set(payload.id, fromJS(payload)),
        ids: state.get('ids').add(payload.id)
      })
    },

    [`${TYPE}_UPDATE`] (state, { payload }) {
      return state.mergeIn([ 'byId', payload.id ], fromJS(payload))
    },

    [`${TYPE}_DELETE`] (state, { payload: id }) {
      return state.merge({
        byId: state.get('byId').delete(id),
        ids: state.get('ids').delete(id),
        selected: state.get('selected').delete(id)
      })
    },

    [`${TYPE}_SELECT`] (state, { payload: selected }) {
      return state.merge({
        selected: new Set(selected)
      })
    }
  })
}
