/* @flow */

import SelectField from 'material-ui/SelectField'
import React, { PropTypes } from 'react'

import './ReduxFormSelectField.css'

export const ReduxFormSelectField = ({ input, label, meta: { touched, error }, children }) => {
  const fieldProps = {
    className: `ReduxFormSelectField-${input.name}`,
    errorText: touched && error,
    floatingLabelText: label,
    onChange: (event, index, value) => input.onChange(value)
  }
  return (
    <SelectField {...input} {...fieldProps} value={input.value}>
      {children}
    </SelectField>
  )
}

ReduxFormSelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,

  children: PropTypes.node
}

export default ReduxFormSelectField
