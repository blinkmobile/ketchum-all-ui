/* @flow */

import { createCollectionReducer } from '../helpers/collection/reducer.js'
import { createCollectionSelectors } from '../helpers/collection/selectors.js'

export default createCollectionReducer('projects')

const selectors = createCollectionSelectors('projects')
export const getProjectsMap = selectors.getProjectsMap
export const getSelectedProjects = selectors.getSelectedProjects
