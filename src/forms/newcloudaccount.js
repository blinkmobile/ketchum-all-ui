/* @flow */

import { TENANCY_VALUES, VENDOR_VALUES } from '../lib/values.js'
import { store } from '../redux/store.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

export const preSubmit = (values /* : Object */) /* : Object */ => Object.assign({}, values, {
  tenant: Object.assign({}, values.tenant, { type: 'tenants' })
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
  if (!tenant || !tenant.get('id')) {
    errors.tenant = 'required'
  } else if (!getTenantsMap(store.getState()).has(tenant.get('id'))) {
    errors.tenant = 'refers to missing / non-existant customer'
  }

  return errors
}
