import { Map, Set } from 'immutable'
import ActionDelete from 'material-ui/svg-icons/action/delete-forever'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  resourceMapToArray, rowIndicesToResourceIds
} from '../lib/rows.js'
import {
  deleteSelectedCloudaccounts, requestCloudaccounts, selectCloudaccounts
} from '../redux/actions/cloudaccounts.js'
import {
  getCloudaccountsMap, getSelectedCloudaccounts
} from '../redux/reducers/cloudaccounts.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
import RouteSection from '../components/RouteSection.js'

import './Cloudaccounts.css'

class Cloudaccounts extends Component {
  constructor (props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount () {
    this.props.requestCloudaccounts()
  }

  handleSelect (rowsSelected) {
    const { selectCloudaccounts, cloudaccountsMap } = this.props
    const selectedCloudaccounts = rowIndicesToResourceIds(
      cloudaccountsMap,
      rowsSelected
    )
    selectCloudaccounts(selectedCloudaccounts)
  }

  render () {
    const {
      children, cloudaccountsMap, deleteSelectedCloudaccounts, selectedCloudaccounts, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'AccountID', 'Tenant', 'Tenancy' ],
      onSelect: this.handleSelect
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
              <TableRow key={id} selected={selectedCloudaccounts.has(id)}>
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

        <FloatingActionButton className='CloudaccountsDeleteFAB' secondary title='delete' onClick={deleteSelectedCloudaccounts}>
          <ActionDelete />
        </FloatingActionButton>

        {children}
      </RouteSection>
    )
  }
}

Cloudaccounts.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  cloudaccountsMap: PropTypes.instanceOf(Map),
  selectedCloudaccounts: PropTypes.instanceOf(Set),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteSelectedCloudaccounts: PropTypes.func,
  requestCloudaccounts: PropTypes.func,
  selectCloudaccounts: PropTypes.func
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state),
  selectedCloudaccounts: getSelectedCloudaccounts(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  deleteSelectedCloudaccounts,
  requestCloudaccounts,
  selectCloudaccounts
}
export default connect(mapStateToProps, mapDispatchToProps)(Cloudaccounts)
