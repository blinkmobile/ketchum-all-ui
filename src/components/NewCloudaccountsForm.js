import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import ReduxFormTextField from './ReduxFormTextField.js'
import ReduxFormTenantField from './ReduxFormTenantField.js'
import { validate } from '../forms/newcloudaccounts.js'

import './NewCloudaccountsForm.css'

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
    component: ReduxFormTextField,
    label: 'Tenancy',
    name: 'tenancy',
    title: '"single" or "multi"',
    type: 'text'
  },
  {
    component: ReduxFormTenantField,
    label: 'Tenant',
    name: 'tenant',
    title: 'customer, partner, or other organisation'
  },
  {
    component: ReduxFormTextField,
    label: 'Vendor',
    name: 'vendor',
    title: '"aws"',
    type: 'text'
  }
]

const NewCloudaccountsForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
  </form>
)

NewCloudaccountsForm.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newcloudaccount',
  validate
})(NewCloudaccountsForm)
