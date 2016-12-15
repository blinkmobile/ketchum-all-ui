import { Map } from 'immutable'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, getFormValues, reduxForm } from 'redux-form/immutable'

import CloudaccountRelation from '../fields/CloudaccountRelation.js'
import CloudaccountsRelation from '../fields/CloudaccountsRelation.js'
import ServiceTypeField from '../fields/ServiceTypeField.js'
import TenancyField from '../fields/TenancyField.js'
import TenantRelation from '../fields/TenantRelation.js'
import TextField from '../fields/TextField.js'
import { validate } from '../../forms/newservice.js'

import './NewService.css'

const fields = [
  {
    component: TenancyField,
    label: 'Tenancy',
    name: 'tenancy',
    title: 'shared service? or private?'
  },
  {
    component: TextField,
    label: 'Name',
    name: 'name',
    title: 'short-unique-lower-case',
    type: 'text'
  },
  {
    component: TextField,
    label: 'Label',
    name: 'label',
    title: 'Organisation Name',
    type: 'text'
  },
  {
    component: ServiceTypeField,
    label: 'Service Type',
    name: 'serviceType',
    title: ''
  },
  {
    component: TextField,
    label: 'Origin',
    name: 'origin',
    title: 'protocol://hostname[:port] (no end slash)',
    type: 'url'
  },
  {
    component: TextField,
    label: 'Note',
    name: 'note',
    title: 'other details...',
    type: 'textarea'
  }
]

const NewService = ({ onSubmit, values }) => (
  <form onSubmit={onSubmit}>
    <TenantRelation name='tenant' label='Tenant' />
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
    <CloudaccountsRelation name='cloudaccounts' label='Cloud Accounts' />
    { values && values.get('serviceType') === 'api' && (
      <CloudaccountRelation name='deploycloudaccount' label='Cloud Account for Deployments' />
    ) }
  </form>
)

NewService.propTypes = {
  onSubmit: PropTypes.func,

  // mapStateToProps
  values: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  values: getFormValues('newservice')(state)
})
const mapDispatchToProps = {}
export default reduxForm({
  form: 'newservice',
  validate
})(connect(mapStateToProps, mapDispatchToProps)(NewService))
