import React, { PropTypes } from 'react'
import { Field, FormSection } from 'redux-form/immutable'

import TenantIdField from './TenantIdField.js'

const TenantRelation = ({ label, name }) => (
  <FormSection name={name}>
    <Field name='id' label={label || name} component={TenantIdField} />
  </FormSection>
)

TenantRelation.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}

export default TenantRelation
