import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import Form from './Form.js'
import TextField from '../fields/TextField.js'
import { validate } from '../../forms/newtenant.js'

import './NewTenant.css'

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
    component: TextField,
    label: 'Note',
    name: 'note',
    title: 'other details...',
    type: 'textarea'
  }
]

const NewTenant = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
  </Form>
)

NewTenant.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newtenant',
  validate
})(NewTenant)
