/* @flow */

import { Map } from 'immutable'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getTenantsMap } from '../redux/reducers/tenants.js'

import './ReduxFormTenantField.css'

export const ReduxFormTenantField = ({ input, label, meta: { touched, error }, tenantsMap }) => {
  const fieldProps = {
    className: `ReduxFormTenantField-${input.name}`,
    errorText: touched && error,
    floatingLabelText: label,
    onChange: (event, index, value) => input.onChange(value)
  }
  return (
    <SelectField {...input} {...fieldProps} value={input.value}>
      { Array.from(tenantsMap.entries()).map(([ id, tenant ]) => {
        const label = tenant.get('label') || tenant.get('name')
        return (
          <MenuItem key={id} value={id} primaryText={label} />
        )
      }) }
    </SelectField>
  )
}

ReduxFormTenantField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,

  // mapStateToProps,
  tenantsMap: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ReduxFormTenantField)
