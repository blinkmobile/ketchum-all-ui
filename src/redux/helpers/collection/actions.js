import startCase from 'lodash.startcase'
import { push } from 'react-router-redux'

import { createClient } from '../../../lib/jsonapi.js'

export const createCollectionActions = (type) => {
  type = type.toLowerCase()
  const TYPE = type.toUpperCase()
  const Type = startCase(type)

  const actions = {
    [`create${Type}`]: (resource) => ({
      type: `${TYPE}_CREATE`,
      payload: resource
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
        resource.sync((err, resource) => {
          if (err) {
            console.error(err)
            dispatch(actions[`create${Type}Error`])
            return
          }
          dispatch(actions[`create${Type}Success`](resource.toJSON()))
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

    [`create${Type}Error`]: () => ({ type: `CREATE_${TYPE}_ERROR` })
  }

  return actions
}
