import TextField from 'material-ui/TextField'
import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import { validate } from '../forms/newtenant.js'

import './NewTenantForm.css'

const renderTextField = ({ input, label, type, meta: { touched, error } }) => {
  const fieldProps = {
    className: `NewTenantForm__${input.name}`,
    errorText: touched && error,
    floatingLabelText: label,
    multiLine: type === 'textarea',
    fullWidth: true
  }
  if (![ 'password', 'text' ].includes(type)) {
    type = undefined
  }
  return (
    <TextField {...input} {...fieldProps} type={type} value={input.value} />
  )
}

renderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
}

const NewTenantForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Field name='name' label='Name' type='text' component={renderTextField} title='short-unique-lower-case' />
    <Field name='label' label='Label' type='text' component={renderTextField} title='Organisation Name' />
    <Field name='note' label='Note' type='textarea' component={renderTextField} title='other details ...' />
  </form>
)

NewTenantForm.propTypes = {
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'newtenant',
  validate
})(NewTenantForm)
