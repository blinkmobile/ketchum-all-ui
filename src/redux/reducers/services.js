/* @flow */

import { createCollectionReducer } from '../helpers/collection/reducer.js'
import { createCollectionSelectors } from '../helpers/collection/selectors.js'

export default createCollectionReducer('services')

const selectors = createCollectionSelectors('services')
export const getServicesMap = selectors.getServicesMap
export const getSelectedServices = selectors.getSelectedServices
