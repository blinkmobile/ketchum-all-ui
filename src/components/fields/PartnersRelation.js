import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton'
import React, { PropTypes } from 'react'
import { Field, FieldArray } from 'redux-form/immutable'

import TenantIdField from './TenantIdField.js'

import './PartnersRelation.css'

// http://redux-form.com/6.3.1/examples/fieldArrays/

const RelatedPartners = ({ fields, meta: { touched, error } }) => (
  <ul className='RelatedPartners'>
    { fields.map((tenant, index) => (
      <li className='RelatedPartner' key={index}>
        <Field name={`${tenant}.id`} label={'Partner'} component={TenantIdField} />
        <FlatButton label='Remove' secondary onClick={() => fields.remove(index)} />
      </li>
    )) }
    <li>
      <FlatButton label='Add Partner' primary onClick={() => fields.push(new Map())} />
      {touched && error && <span>{error}</span>}
    </li>
  </ul>
)

RelatedPartners.propTypes = {
  // http://redux-form.com/6.3.1/docs/api/FieldArray.md/
  fields: PropTypes.object,
  meta: PropTypes.object
}

const PartnersRelation = ({ label, name }) => (
  <FieldArray name={name} component={RelatedPartners} />
)

PartnersRelation.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}

export default PartnersRelation
