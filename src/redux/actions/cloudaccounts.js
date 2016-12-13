/* @flow */

import { createCollectionActions } from '../helpers/collection/actions.js'

const actions = createCollectionActions('cloudaccounts')

export const createCloudaccounts = actions.createCloudaccounts
export const selectCloudaccounts = actions.selectCloudaccounts
export const deleteSelectedCloudaccounts = actions.deleteSelectedCloudaccounts

export const createCloudaccountsSubmit = actions.createCloudaccountsSubmit
export const createCloudaccountsSuccess = actions.createCloudaccountsSuccess
export const createCloudaccountsError = actions.createCloudaccountsError

export const deleteCloudaccountsSubmit = actions.deleteCloudaccountsSubmit
export const deleteCloudaccountsSuccess = actions.deleteCloudaccountsSuccess
export const deleteCloudaccountsError = actions.deleteCloudaccountsError

export const requestCloudaccounts = actions.requestCloudaccounts
