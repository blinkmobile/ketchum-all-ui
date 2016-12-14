import { Map } from 'immutable'
import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import ServiceTypeField from '../fields/ServiceTypeField.js'
import ServiceRelation from '../fields/ServiceRelation.js'
import TenantRelation from '../fields/TenantRelation.js'
import PartnersRelation from '../fields/PartnersRelation.js'
import TextField from '../fields/TextField.js'
import { validate } from '../../forms/newproject.js'

import './NewProject.css'

const fields = [
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
    label: 'URL',
    name: 'url',
    title: '',
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

const NewProject = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <TenantRelation name='customer' label='Customer' />
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
    <ServiceRelation name='service' label='Service' />
    <PartnersRelation name='partners' label='Partners' />
  </form>
)

NewProject.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newproject',
  initialValues: new Map({
    serviceType: 'api'
  }),
  validate
})(NewProject)
