/* @flow */

import { createCollectionActions } from '../helpers/collection.js'

const actions = createCollectionActions('tenants')
export const createTenants = actions.createTenants
export const requestTenants = actions.requestTenants
