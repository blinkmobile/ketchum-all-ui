import React, { PropTypes } from 'react'
import { Field, FormSection } from 'redux-form/immutable'

import CloudaccountIdField from './CloudaccountIdField.js'

const CloudaccountRelation = ({ label, name }) => (
  <FormSection name={name}>
    <Field name='id' label={label || name} component={CloudaccountIdField} />
  </FormSection>
)

CloudaccountRelation.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}

export default CloudaccountRelation
