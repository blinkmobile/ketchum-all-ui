/* @flow */

import TextField from 'material-ui/TextField'
import React, { PropTypes } from 'react'

import './ReduxFormTextField.css'

export const ReduxFormTextField = ({ input, label, type, meta: { touched, error } }) => {
  const fieldProps = {
    className: `ReduxFormTextField-${input.name}`,
    errorText: touched && error,
    floatingLabelText: label,
    multiLine: type === 'textarea',
    fullWidth: type === 'textarea'
  }
  if (![ 'password', 'text' ].includes(type)) {
    type = undefined
  }
  return (
    <TextField {...input} {...fieldProps} type={type} value={input.value} />
  )
}

ReduxFormTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
}

export default ReduxFormTextField
