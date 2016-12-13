/* @flow */

import { createCollectionReducer } from '../helpers/collection/reducer.js'
import { createCollectionSelectors } from '../helpers/collection/selectors.js'

export default createCollectionReducer('cloudaccounts')

const selectors = createCollectionSelectors('cloudaccounts')
export const getCloudaccountsMap = selectors.getCloudaccountsMap
export const getSelectedCloudaccounts = selectors.getSelectedCloudaccounts
