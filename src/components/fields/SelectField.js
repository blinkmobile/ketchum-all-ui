import MUISelectField from 'material-ui/SelectField'
import React, { PropTypes } from 'react'

import './SelectField.css'

export const SelectField = ({ input, label, meta: { touched, error }, children }) => {
  const fieldProps = {
    className: `SelectField-${input.name}`,
    errorText: touched && error,
    floatingLabelText: label,
    onChange: (event, index, value) => input.onChange(value)
  }
  return (
    <MUISelectField {...input} {...fieldProps} value={input.value}>
      {children}
    </MUISelectField>
  )
}

SelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,

  children: PropTypes.node
}

export default SelectField
