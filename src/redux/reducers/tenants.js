import { createCollectionReducer } from '../helpers/collection/reducer.js'
import { createCollectionSelectors } from '../helpers/collection/selectors.js'

export default createCollectionReducer('tenants')

const selectors = createCollectionSelectors('tenants')
export const getTenantsMap = selectors.getTenantsMap
