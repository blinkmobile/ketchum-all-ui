/* @flow */

import { createCollectionActions } from '../helpers/collection/actions.js'

const actions = createCollectionActions('projects')

export const createProjects = actions.createProjects
export const selectProjects = actions.selectProjects
export const deleteSelectedProjects = actions.deleteSelectedProjects

export const createProjectsSubmit = actions.createProjectsSubmit
export const createProjectsSuccess = actions.createProjectsSuccess
export const createProjectsError = actions.createProjectsError

export const deleteProjectsSubmit = actions.deleteProjectsSubmit
export const deleteProjectsSuccess = actions.deleteProjectsSuccess
export const deleteProjectsError = actions.deleteProjectsError

export const requestProjects = actions.requestProjects
