import React, { PropTypes } from 'react'
import { Field, FormSection } from 'redux-form/immutable'

import ServiceIdField from './ServiceIdField.js'

const ServiceRelation = ({ label, name }) => (
  <FormSection name={name}>
    <Field name='id' label={label || name} component={ServiceIdField} />
  </FormSection>
)

ServiceRelation.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}

export default ServiceRelation
