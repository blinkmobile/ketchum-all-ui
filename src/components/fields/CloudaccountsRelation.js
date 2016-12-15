import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton'
import React, { PropTypes } from 'react'
import { Field, FieldArray } from 'redux-form/immutable'

import CloudaccountIdField from './CloudaccountIdField.js'

import './CloudaccountsRelation.css'

// http://redux-form.com/6.3.1/examples/fieldArrays/

const RelatedCloudaccounts = ({ fields, meta: { touched, error } }) => (
  <ul className='RelatedCloudaccounts'>
    { fields.map((cloudaccount, index) => (
      <li className='RelatedCloudaccount' key={index}>
        <Field name={`${cloudaccount}.id`} label={'Cloud Account'} component={CloudaccountIdField} />
        <FlatButton label='Remove' secondary onClick={() => fields.remove(index)} />
      </li>
    )) }
    <li>
      <FlatButton label='Add Cloud Account' primary onClick={() => fields.push(new Map())} />
      {touched && error && <span>{error}</span>}
    </li>
  </ul>
)

RelatedCloudaccounts.propTypes = {
  // http://redux-form.com/6.3.1/docs/api/FieldArray.md/
  fields: PropTypes.object,
  meta: PropTypes.object
}

const CloudaccountsRelation = ({ label, name }) => (
  <FieldArray name={name} component={RelatedCloudaccounts} />
)

CloudaccountsRelation.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}

export default CloudaccountsRelation
