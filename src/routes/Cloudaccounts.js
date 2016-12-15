import { Map } from 'immutable'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

import {
  resourceMapToArray, rowIndexToResourceId
} from '../lib/rows.js'
import { requestCloudaccounts } from '../redux/actions/cloudaccounts.js'
import { getCloudaccountsMap } from '../redux/reducers/cloudaccounts.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
import RouteSection from '../components/RouteSection.js'

import './Cloudaccounts.css'

class Cloudaccounts extends Component {
  constructor (props) {
    super(props)

    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount () {
    this.props.requestCloudaccounts()
  }

  handleCellClick (row, col) {
    const { cloudaccountsMap, push } = this.props
    push('/cloudaccounts/' + rowIndexToResourceId(cloudaccountsMap, row))
  }

  render () {
    const {
      children, cloudaccountsMap, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'AccountID', 'Tenant', 'Tenancy' ],
      onCellClick: this.handleCellClick
    }

    return (
      <RouteSection>
        <ResourceTable {...tableProps}>
          { resourceMapToArray(cloudaccountsMap).map((cloudaccount) => {
            const {
              accountId, id, name, tenancy, vendor,
              tenant: relatedTenant
            } = cloudaccount.toJS()
            let tenantLabel = ''
            if (relatedTenant && tenantsMap.has(relatedTenant.id)) {
              tenantLabel = tenantsMap.get(relatedTenant.id).get('label')
            }
            return (
              <TableRow key={id}>
                <TableRowColumn title={name}>{vendor} {accountId}</TableRowColumn>
                <TableRowColumn>{tenantLabel}</TableRowColumn>
                <TableRowColumn>{tenancy}</TableRowColumn>
              </TableRow>
            )
          }) }
        </ResourceTable>

        <Link to='/cloudaccounts/new'>
          <FloatingActionButton className='CloudaccountsAddFAB' title='add'>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        {children}
      </RouteSection>
    )
  }
}

Cloudaccounts.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  cloudaccountsMap: PropTypes.instanceOf(Map),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  push: PropTypes.func,
  requestCloudaccounts: PropTypes.func
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  push,
  requestCloudaccounts
}
export default connect(mapStateToProps, mapDispatchToProps)(Cloudaccounts)
