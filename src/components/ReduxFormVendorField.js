/* @flow */

import { Map } from 'immutable'
import MenuItem from 'material-ui/MenuItem'
import React, { PropTypes } from 'react'

import ReduxFormSelectField from './ReduxFormSelectField.js'

import { VENDOR_VALUES } from '../lib/values.js'

export const ReduxFormVendorField = ({ input, label, meta, tenantsMap }) => {
  const fieldProps = {
    input,
    label,
    meta
  }
  return (
    <ReduxFormSelectField {...fieldProps}>
      { VENDOR_VALUES.map((value) => (
        <MenuItem key={value} value={value} primaryText={value} />
      )) }
    </ReduxFormSelectField>
  )
}

ReduxFormVendorField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,

  // mapStateToProps,
  tenantsMap: PropTypes.instanceOf(Map)
}

export default ReduxFormVendorField
