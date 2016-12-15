/* @flow */

import { Map } from 'immutable'

import { SERVICETYPE_VALUES } from '../lib/values.js'
import { store } from '../redux/store.js'
import { getServicesMap } from '../redux/reducers/services.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

export const preSubmit = (values /* : Object */) /* : Object */ => {
  values = Object.assign({}, values, {
    customer: Object.assign({}, values.customer, { type: 'tenants' }),
    service: Object.assign({}, values.service, { type: 'services' })
  })
  if (Array.isArray(values.partners)) {
    values.partners = values.partners
      .filter(({ id }) => !!id)
      .map(({ id }) => ({ id, type: 'tenants' }))
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

  const customer = values.get('customer')
  if (!customer || !customer.get('id')) {
    errors.customer = 'required'
  } else if (!getTenantsMap(store.getState()).has(customer.get('id'))) {
    errors.customer = 'refers to missing / non-existant customer'
  }

  const service = values.get('service')
  if (!service || !service.get('id')) {
    errors.service = 'required'
  } else if (!getServicesMap(store.getState()).has(service.get('id'))) {
    errors.service = 'refers to missing / non-existant service'
  }

  const partnersErrors = values.has('partners') && values.get('partners')
    .map((partner) => {
      if (!Map.isMap(partner) || !partner.get('id')) {
        return 'required'
      }
      if (partner.get('id') === customer.get('id')) {
        return 'should be different to customer'
      }
      if (!getTenantsMap(store.getState()).has(partner.get('id'))) {
        return 'refers to missing / non-existant partner'
      }
      return null
    })
    .filter((error) => !!error)

  if (partnersErrors && partnersErrors.size) {
    errors.partners = partnersErrors.toJS()
  }

  return errors
}
