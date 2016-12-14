/* @flow */

import { createCollectionActions } from '../helpers/collection/actions.js'

const actions = createCollectionActions('services')

export const createServices = actions.createServices
export const selectServices = actions.selectServices
export const deleteSelectedServices = actions.deleteSelectedServices

export const createServicesSubmit = actions.createServicesSubmit
export const createServicesSuccess = actions.createServicesSuccess
export const createServicesError = actions.createServicesError

export const deleteServicesSubmit = actions.deleteServicesSubmit
export const deleteServicesSuccess = actions.deleteServicesSuccess
export const deleteServicesError = actions.deleteServicesError

export const requestServices = actions.requestServices
