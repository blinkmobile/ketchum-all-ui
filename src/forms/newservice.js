/* @flow */

import { Map } from 'immutable'

import { SERVICETYPE_VALUES, TENANCY_VALUES } from '../lib/values.js'
import { store } from '../redux/store.js'
import { getCloudaccountsMap } from '../redux/reducers/cloudaccounts.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

export const preSubmit = (values /* : Object */) /* : Object */ => {
  values = Object.assign({}, values, {
    tenant: Object.assign({}, values.tenant, { type: 'tenants' })
  })
  if (values.serviceType === 'api') {
    values.deploycloudaccount.type = 'cloudaccounts'
  } else {
    delete values.deploycloudaccount
  }
  if (Array.isArray(values.cloudaccounts)) {
    values.cloudaccounts = values.cloudaccounts
      .filter(({ id }) => !!id)
      .map(({ id }) => ({ id, type: 'cloudaccounts' }))
  }
  return values
}

export const validate = (values /* : Object */) => {
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'required'
  } else if (values.get('name').length < 2) {
    errors.name = 'at least 2 characters'
  } else if (!/^[a-z][a-z-]+$/.test(values.get('name'))) {
    errors.name = 'use lowercase letters and hyphens'
  }

  if (!values.get('serviceType')) {
    errors.serviceType = 'required'
  } else if (!SERVICETYPE_VALUES.includes(values.get('serviceType'))) {
    errors.serviceType = 'one of: ' + SERVICETYPE_VALUES.join(', ')
  }

  if (!values.get('tenancy')) {
    errors.tenancy = 'required'
  } else if (!TENANCY_VALUES.includes(values.get('tenancy'))) {
    errors.tenancy = 'one of: ' + TENANCY_VALUES.join(', ')
  }

  const tenant = values.get('tenant')
  if (!tenant || !tenant.get('id')) {
    errors.tenant = 'required'
  } else if (!getTenantsMap(store.getState()).has(tenant.get('id'))) {
    errors.tenant = 'refers to missing / non-existant customer'
  }

  if (values.get('serviceType') === 'api') {
    const deploycloudaccount = values.get('deploycloudaccount')
    if (!deploycloudaccount || !deploycloudaccount.get('id')) {
      errors.deploycloudaccount = 'required'
    } else if (!getCloudaccountsMap(store.getState()).has(deploycloudaccount.get('id'))) {
      errors.deploycloudaccount = 'refers to missing / non-existant cloudaccount'
    }
  }

  if (!values.has('cloudaccounts')) {
    errors.cloudaccounts = 'required'
  }

  const cloudaccountsErrors = values.has('cloudaccounts') && values.get('cloudaccounts')
    .map((cloudaccount) => {
      if (!Map.isMap(cloudaccount) || !cloudaccount.get('id')) {
        return 'required'
      }
      if (!getCloudaccountsMap(store.getState()).has(cloudaccount.get('id'))) {
        return 'refers to missing / non-existant cloudaccount'
      }
      return null
    })
    .filter((error) => !!error)

  if (cloudaccountsErrors && cloudaccountsErrors.size) {
    errors.cloudaccounts = cloudaccountsErrors.toJS()
  }

  return errors
}
