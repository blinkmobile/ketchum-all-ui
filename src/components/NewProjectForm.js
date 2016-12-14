import { Map } from 'immutable'
import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import ServiceTypeField from './fields/ServiceTypeField.js'
import ServiceRelation from './fields/ServiceRelation.js'
import TenantRelation from './fields/TenantRelation.js'
import PartnersRelation from './fields/PartnersRelation.js'
import ReduxFormTextField from './ReduxFormTextField.js'
import { validate } from '../forms/newproject.js'

import './NewProjectForm.css'

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
    component: ServiceTypeField,
    label: 'Service Type',
    name: 'serviceType',
    title: ''
  },
  {
    component: ReduxFormTextField,
    label: 'URL',
    name: 'url',
    title: '',
    type: 'url'
  },
  {
    component: ReduxFormTextField,
    label: 'Note',
    name: 'note',
    title: 'other details...',
    type: 'textarea'
  }
]

const NewProjectForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <TenantRelation name='customer' label='Customer' />
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
    <ServiceRelation name='service' label='Service' />
    <PartnersRelation name='partners' label='Partners' />
  </form>
)

NewProjectForm.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newproject',
  initialValues: new Map({
    serviceType: 'api'
  }),
  validate
})(NewProjectForm)
