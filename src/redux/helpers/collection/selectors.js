import { Map } from 'immutable'
import startCase from 'lodash.startcase'

export const createCollectionSelectors = (type) => {
  type = type.toLowerCase()
  const Type = startCase(type)

  return {
    [`get${Type}Map`]: (state) => state.getIn([ type, 'byId' ]) || new Map()
  }
}
