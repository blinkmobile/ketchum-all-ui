import { Map } from 'immutable'
import MenuItem from 'material-ui/MenuItem'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getTenantsMap } from '../../redux/reducers/tenants.js'
import ReduxFormSelectField from '../ReduxFormSelectField.js'

export const TenantIdField = ({ input, label, meta, tenantsMap }) => {
  const fieldProps = {
    input,
    label,
    meta
  }
  return (
    <ReduxFormSelectField {...fieldProps}>
      { Array.from(tenantsMap.entries()).map(([ id, tenant ]) => {
        const label = tenant.get('label') || tenant.get('name')
        return (
          <MenuItem key={id} value={id} primaryText={label} />
        )
      }) }
    </ReduxFormSelectField>
  )
}

TenantIdField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,

  // mapStateToProps
  tenantsMap: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(TenantIdField)
