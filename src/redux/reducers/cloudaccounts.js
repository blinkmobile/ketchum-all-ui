import {
  createCollectionReducer, createCollectionSelectors
} from '../helpers/collection.js'

export default createCollectionReducer('cloudaccounts')

const selectors = createCollectionSelectors('cloudaccounts')
export const getCloudaccountsMap = selectors.getCloudaccountsMap
