import { Map } from 'immutable'
import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import ReduxFormTextField from './ReduxFormTextField.js'
import ReduxFormTenancyField from './ReduxFormTenancyField.js'
import ReduxFormTenantField from './ReduxFormTenantField.js'
import ReduxFormVendorField from './ReduxFormVendorField.js'
import { validate } from '../forms/newcloudaccount.js'

import './NewCloudaccountForm.css'

const fields = [
  {
    component: ReduxFormTextField,
    label: 'Name',
    name: 'name',
    title: 'short-unique-lower-case',
    type: 'text'
  },
  {
    component: ReduxFormTextField,
    label: 'Label',
    name: 'label',
    title: 'Organisation Name',
    type: 'text'
  },
  {
    component: ReduxFormTextField,
    label: 'Note',
    name: 'note',
    title: 'other details...',
    type: 'textarea'
  },
  {
    component: ReduxFormTextField,
    label: 'Account ID',
    name: 'accountId',
    title: 'numbers',
    type: 'text'
  },
  {
    component: ReduxFormTenancyField,
    label: 'Tenancy',
    name: 'tenancy',
    title: 'shared service? or private?'
  },
  {
    component: ReduxFormTenantField,
    label: 'Tenant',
    name: 'tenant',
    title: 'customer, partner, or other organisation'
  },
  {
    component: ReduxFormVendorField,
    label: 'Vendor',
    name: 'vendor',
    title: ''
  }
]

const NewCloudaccountForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
  </form>
)

NewCloudaccountForm.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newcloudaccount',
  initialValues: new Map({
    vendor: 'aws'
  }),
  validate
})(NewCloudaccountForm)
