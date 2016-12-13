import startCase from 'lodash.startcase'
import { push } from 'react-router-redux'

import { createClient } from '../../../lib/jsonapi.js'
import { createCollectionSelectors } from './selectors.js'

export const createCollectionActions = (type) => {
  type = type.toLowerCase()
  const TYPE = type.toUpperCase()
  const Type = startCase(type)

  const actions = {
    [`create${Type}`]: (resource) => ({
      type: `${TYPE}_CREATE`,
      payload: resource
    }),

    [`delete${Type}`]: (id) => ({
      type: `${TYPE}_DELETE`,
      payload: id
    }),

    [`select${Type}`]: (selected) => ({
      type: `${TYPE}_SELECT`,
      payload: selected
    }),

    [`request${Type}`]: () => {
      return (dispatch, getState) => {
        dispatch({ type: `REQUEST_${TYPE}` })

        const client = createClient(getState())
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
    },

    [`create${Type}Submit`]: (values) => {
      return (dispatch, getState) => {
        values = values.toJS ? values.toJS() : values
        dispatch({ type: `CREATE_${TYPE}_SUBMIT` })

        const client = createClient(getState())
        const resource = client.create(type, values)
        return resource.sync()
          .then((resource) => {
            dispatch(actions[`create${Type}Success`](resource.toJSON()))
          })
          .catch((err) => {
            console.error(err)
            dispatch(actions[`create${Type}Error`])
          })
      }
    },

    [`create${Type}Success`]: (resource) => {
      return (dispatch, getState) => {
        dispatch({ type: `CREATE_${TYPE}_SUCCESS` })
        dispatch(actions[`create${Type}`](resource))
        dispatch(push(`/${type}`))
      }
    },

    [`create${Type}Error`]: () => ({ type: `DELETE_${TYPE}_ERROR` }),

    [`deleteSelected${Type}`]: () => {
      return (dispatch, getState) => {
        const selectors = createCollectionSelectors(type)
        const selectedIds = selectors[`getSelected${Type}`](getState())
        selectedIds.forEach((id) => {
          dispatch(actions[`delete${Type}Submit`](id))
        })
      }
    },

    [`delete${Type}Submit`]: (id) => {
      return (dispatch, getState) => {
        dispatch({ type: `DELETE_${TYPE}_SUBMIT` })

        const client = createClient(getState())
        console.log(`delete${Type}Submit()`, type, id)
        return client.get(type, id)
          .then((resource) => {
            // hack around a weird bug
            Object.assign(resource._base, { id, type }, resource._base)
            return resource
          })
          .then((resource) => resource.delete())
          .then(() => dispatch(actions[`delete${Type}Success`](id)))
          .catch((err) => {
            console.error(err)
            dispatch(actions[`delete${Type}Error`])
          })
      }
    },

    [`delete${Type}Success`]: (id) => {
      return (dispatch, getState) => {
        dispatch({ type: `DELETE_${TYPE}_SUCCESS` })
        dispatch(actions[`delete${Type}`](id))
      }
    },

    [`delete${Type}Error`]: () => ({ type: `DELETE_${TYPE}_ERROR` })
  }

  return actions
}
