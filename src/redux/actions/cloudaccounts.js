/* @flow */

import { createCollectionActions } from '../helpers/collection.js'

const actions = createCollectionActions('cloudaccounts')

export const createCloudaccounts = actions.createCloudaccounts

export const createCloudaccountsSubmit = actions.createCloudaccountsSubmit
export const createCloudaccountsSuccess = actions.createCloudaccountsSuccess
export const createCloudaccountsError = actions.createCloudaccountsError

export const requestCloudaccounts = actions.requestCloudaccounts
