import { Map } from 'immutable'
import MenuItem from 'material-ui/MenuItem'
import React, { PropTypes } from 'react'

import SelectField from './SelectField.js'

import { TENANCY_VALUES } from '../../lib/values.js'

export const TenancyField = ({ input, label, meta, tenantsMap }) => {
  const fieldProps = {
    input,
    label,
    meta
  }
  return (
    <SelectField {...fieldProps}>
      { TENANCY_VALUES.map((value) => (
        <MenuItem key={value} value={value} primaryText={value} />
      )) }
    </SelectField>
  )
}

TenancyField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,

  // mapStateToProps,
  tenantsMap: PropTypes.instanceOf(Map)
}

export default TenancyField
