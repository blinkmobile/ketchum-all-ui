/* @flow */

import { Map, Set } from 'immutable'
import startCase from 'lodash.startcase'

/* :: import type { CollectionSelectors } from '../../../../types.js' */

export const createCollectionSelectors = (
  type /* : string */
) /* : CollectionSelectors */ => {
  type = type.toLowerCase()
  const Type = startCase(type)

  return {
    [`get${Type}Map`]: (state) => state.getIn([ type, 'byId' ]) || new Map(),

    [`getSelected${Type}`]: (state) => state.getIn([ type, 'selected' ]) || new Set()
  }
}
