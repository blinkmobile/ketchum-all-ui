import { Map } from 'immutable'
import MenuItem from 'material-ui/MenuItem'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getServicesMap } from '../../redux/reducers/services.js'
import SelectField from './SelectField.js'

export const ServiceIdField = ({ input, label, meta, servicesMap }) => {
  const fieldProps = {
    input,
    label,
    meta
  }
  return (
    <SelectField {...fieldProps}>
      { Array.from(servicesMap.entries()).map(([ id, service ]) => {
        const label = service.get('label') || service.get('name')
        return (
          <MenuItem key={id} value={id} primaryText={label} />
        )
      }) }
    </SelectField>
  )
}

ServiceIdField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,

  // mapStateToProps
  servicesMap: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  servicesMap: getServicesMap(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceIdField)
