import MUITextField from 'material-ui/TextField'
import React, { PropTypes } from 'react'

import './TextField.css'

export const TextField = ({ input, label, type, meta: { touched, error } }) => {
  const fieldProps = {
    className: `TextField-${input.name}`,
    errorText: touched && error,
    floatingLabelText: label,
    multiLine: type === 'textarea',
    fullWidth: type === 'textarea'
  }
  if (![ 'password', 'text' ].includes(type)) {
    type = undefined
  }
  return (
    <MUITextField {...input} {...fieldProps} type={type} value={input.value} />
  )
}

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
}

export default TextField
