import { Map, Set } from 'immutable'
import startCase from 'lodash.startcase'

export const createCollectionSelectors = (type) => {
  type = type.toLowerCase()
  const Type = startCase(type)

  return {
    [`get${Type}Map`]: (state) => state.getIn([ type, 'byId' ]) || new Map(),

    [`getSelected${Type}`]: (state) => state.getIn([ type, 'selected' ]) || new Set()
  }
}
