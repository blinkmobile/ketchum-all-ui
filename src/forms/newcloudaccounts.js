/* @flow */

import { store } from '../redux/store.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

const TENANCY_VALUES = [ 'single', 'multi' ]
const VENDOR_VALUES = [ 'aws' ]

export const preSubmit = (values) => Object.assign({}, values, {
  tenant: { id: values.tenant, type: 'tenants' }
})

export const validate = (values /* : Object */) => {
  const errors = {}

  if (!values.get('name')) {
    errors.name = 'required'
  } else if (values.get('name').length < 2) {
    errors.name = 'at least 2 characters'
  } else if (!/^[a-z][a-z-]+$/.test(values.get('name'))) {
    errors.name = 'use lowercase letters and hyphens'
  }

  if (!values.get('accountId')) {
    errors.accountId = 'required'
  } else if (values.get('accountId').length < 5) {
    errors.accountId = 'at least 5 characters'
  } else if (!/^\d+$/.test(values.get('accountId'))) {
    errors.accountId = 'use numbers'
  }

  if (!values.get('tenancy')) {
    errors.tenancy = 'required'
  } else if (!TENANCY_VALUES.includes(values.get('tenancy'))) {
    errors.tenancy = 'one of: ' + TENANCY_VALUES.join(', ')
  }

  if (!values.get('vendor')) {
    errors.vendor = 'required'
  } else if (!VENDOR_VALUES.includes(values.get('vendor'))) {
    errors.vendor = 'one of: ' + VENDOR_VALUES.join(', ')
  }

  const tenant = values.get('tenant')
  if (!tenant) {
    errors.tenant = 'required'
  } else if (!getTenantsMap(store.getState()).has(tenant)) {
    errors.tenant = 'refers to missing / non-existant tenant'
  }

  return errors
}
