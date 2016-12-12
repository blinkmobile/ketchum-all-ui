/* @flow */

import { createCollectionActions } from '../helpers/collection/actions.js'

const actions = createCollectionActions('tenants')

export const createTenants = actions.createTenants

export const createTenantsSubmit = actions.createTenantsSubmit
export const createTenantsSuccess = actions.createTenantsSuccess
export const createTenantsError = actions.createTenantsError

export const requestTenants = actions.requestTenants
