import { Map } from 'immutable'
import MenuItem from 'material-ui/MenuItem'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getCloudaccountsMap } from '../../redux/reducers/cloudaccounts.js'
import SelectField from './SelectField.js'

export const CloudaccountIdField = ({ input, label, meta, cloudaccountsMap }) => {
  const fieldProps = {
    input,
    label,
    meta
  }
  return (
    <SelectField {...fieldProps}>
      { Array.from(cloudaccountsMap.entries()).map(([ id, cloudaccount ]) => {
        const label = cloudaccount.get('label') || cloudaccount.get('name')
        return (
          <MenuItem key={id} value={id} primaryText={label} />
        )
      }) }
    </SelectField>
  )
}

CloudaccountIdField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,

  // mapStateToProps
  cloudaccountsMap: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(CloudaccountIdField)
