import { fromJS, Map, OrderedSet } from 'immutable'
import JsonapiClient from 'jsonapi-client/lib/Client.js'
import startCase from 'lodash.startcase'
import { createReducer } from 'redux-create-reducer'

import { getToken } from '../reducers/auth.js'

const REGISTRY_ORIGIN = `${(process.env.REACT_APP_REGISTRY_ORIGIN || '')}/v1`

export const createCollectionActions = (type) => {
  type = type.toLowerCase()
  const TYPE = type.toUpperCase()
  const Type = startCase(type)

  const actions = {
    [`create${Type}`]: (resource) => ({
      type: `${TYPE}_CREATE`,
      payload: resource
    }),

    [`request${Type}`]: (resource) => {
      return (dispatch, getState) => {
        const token = getToken(getState())
        if (!token) {
          console.warn('no authentication token yet!')
          return
        }

        dispatch({ type: `REQUEST_${TYPE}` })
        const client = new JsonapiClient(REGISTRY_ORIGIN, {
          header: {
            authorization: `Bearer ${token}`
          }
        })

        client.find(type, (err, resources) => {
          if (err) {
            console.error(err)
            return
          }
          resources.forEach((resource) => {
            dispatch(actions[`create${Type}`](resource.toJSON()))
          })
        })
      }
    }
  }

  return actions
}

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

export const createCollectionSelectors = (type) => {
  type = type.toLowerCase()
  const Type = startCase(type)

  return {
    [`get${Type}Map`]: (state) => state.getIn([ type, 'byId' ]) || new Map()
  }
}
