import { Map } from 'immutable'
import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import Form from './Form.js'
import TextField from '../fields/TextField.js'
import TenancyField from '../fields/TenancyField.js'
import TenantRelation from '../fields/TenantRelation.js'
import VendorField from '../fields/VendorField.js'
import { validate } from '../../forms/newcloudaccount.js'

import './NewCloudaccount.css'

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
    component: TextField,
    label: 'Account ID',
    name: 'accountId',
    title: 'numbers',
    type: 'text'
  },
  {
    component: VendorField,
    label: 'Vendor',
    name: 'vendor',
    title: ''
  },
  {
    component: TextField,
    label: 'Note',
    name: 'note',
    title: 'other details...',
    type: 'textarea'
  }
]

const NewCloudaccount = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <TenantRelation name='tenant' label='Tenant' />
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
  </Form>
)

NewCloudaccount.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newcloudaccount',
  initialValues: new Map({
    vendor: 'aws'
  }),
  validate
})(NewCloudaccount)
