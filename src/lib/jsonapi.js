/* @flow */

import JsonapiClient from 'jsonapi-client/lib/Client.js'

/* :: import type { RootState } from '../../types.js' */

import { getToken } from '../redux/reducers/auth.js'

const REGISTRY_ORIGIN = `${(process.env.REACT_APP_REGISTRY_ORIGIN || '')}/v1`

export const createClient = (state /* : RootState */) => {
  const token = getToken(state)
  const client = new JsonapiClient(REGISTRY_ORIGIN, {
    header: {
      authorization: `Bearer ${token}`
    }
  })
  return client
}
