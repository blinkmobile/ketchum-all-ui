import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import ReduxFormTextField from './ReduxFormTextField.js'
import { validate } from '../forms/newtenant.js'

import './NewTenantForm.css'

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
  }
]

const NewTenantForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    { fields.map((fieldProps) => (
      <Field key={fieldProps.name} {...fieldProps} />
    )) }
  </form>
)

NewTenantForm.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newtenant',
  validate
})(NewTenantForm)
