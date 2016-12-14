/* @flow */

/* :: import type { CollectionIdMap, Resource } from '../../types.js' */

export const resourceMapToArray = (
  resourceMap /* : CollectionIdMap */
) /* : Resource[] */ => {
  return Array.from(resourceMap.values())
}

export const rowIndicesToResourceIds = (
  resourceMap /* : CollectionIdMap */,
  indices /* : number[] | 'all' */
) /* : string[] */ => {
  const rows = resourceMapToArray(resourceMap)
  if (Array.isArray(indices)) {
    return rows
      // $FlowFixMe: using Array#includes() here, not String#includes()
      .filter((resource, index) => indices.includes(index))
      .map((resource) => resource.get('id'))
  }
  if (indices === 'all') {
    return rows.map((resource) => resource.get('id'))
  }
  return []
}
