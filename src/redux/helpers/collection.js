import { fromJS, Map, OrderedSet } from 'immutable'
import JsonapiClient from 'jsonapi-client/lib/Client.js'
import startCase from 'lodash.startcase'
import { createReducer } from 'redux-create-reducer'

import { getToken } from '../reducers/auth.js'

const REGISTRY_ORIGIN = `${(process.env.REACT_APP_REGISTRY_ORIGIN || '')}/v1`

export const createCollectionActions = (type) => {
  const TYPE = type.toUpperCase()
  type = startCase(type)

  const actions = {
    [`create${type}`]: (resource) => ({
      type: `${TYPE}_CREATE`,
      payload: resource
    }),

    [`request${type}`]: (resource) => {
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

        client.find('tenants', (err, resources) => {
          if (err) {
            console.error(err)
            return
          }
          resources.forEach((resource) => {
            dispatch(actions.createTenants(resource.toJSON()))
          })
        })
      }
    }
  }

  return actions
}

export const createCollectionReducer = (type) => {
  type = type.toUpperCase()

  const initialState = new Map({
    byId: new Map(),
    ids: new OrderedSet()
  })

  return createReducer(initialState, {
    [`${type}_CREATE`] (state, { payload }) {
      return new Map({
        byId: state.get('byId').set(payload.id, fromJS(payload)),
        ids: state.get('ids').add(payload.id)
      })
    },

    [`${type}_UPDATE`] (state, { payload }) {
      return state.mergeIn([ 'byId', payload.id ], fromJS(payload))
    },

    [`${type}_DELETE`] (state, { payload: { id } }) {
      return new Map({
        byId: state.get('byId').delete(id),
        ids: state.get('ids').delete(id)
      })
    }
  })
}

export const createCollectionSelectors = (type) => {
  type = startCase(type)

  return {
    [`get${type}Map`]: (state) => state.getIn([ 'tenants', 'byId' ])
  }
}
