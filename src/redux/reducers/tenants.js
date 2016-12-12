import {
  createCollectionReducer, createCollectionSelectors
} from '../helpers/collection.js'

export default createCollectionReducer('tenants')

const selectors = createCollectionSelectors('tenants')
export const getTenantsMap = selectors.getTenantsMap
