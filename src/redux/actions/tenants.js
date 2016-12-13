/* @flow */

import { createCollectionActions } from '../helpers/collection/actions.js'

const actions = createCollectionActions('tenants')

export const createTenants = actions.createTenants
export const selectTenants = actions.selectTenants
export const deleteSelectedTenants = actions.deleteSelectedTenants

export const createTenantsSubmit = actions.createTenantsSubmit
export const createTenantsSuccess = actions.createTenantsSuccess
export const createTenantsError = actions.createTenantsError

export const deleteTenantsSubmit = actions.deleteTenantsSubmit
export const deleteTenantsSuccess = actions.deleteTenantsSuccess
export const deleteTenantsError = actions.deleteTenantsError

export const requestTenants = actions.requestTenants
