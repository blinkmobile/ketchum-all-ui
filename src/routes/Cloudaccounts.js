import { Map, Set } from 'immutable'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { requestCloudaccounts, selectCloudaccounts } from '../redux/actions/cloudaccounts.js'
import {
  getCloudaccountsMap, getSelectedCloudaccounts
} from '../redux/reducers/cloudaccounts.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
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
    const rows = Array.from(cloudaccountsMap.values())
    let selectedCloudaccounts
    if (rowsSelected === 'all') {
      selectedCloudaccounts = rows.map((cloudaccount) => cloudaccount.get('id'))
    } else if (Array.isArray(rowsSelected)) {
      selectedCloudaccounts = rows
        .filter((cloudaccount, index) => rowsSelected.includes(index))
        .map((cloudaccount) => cloudaccount.get('id'))
    }
    selectCloudaccounts(selectedCloudaccounts)
  }

  render () {
    const {
      children, cloudaccountsMap, selectedCloudaccounts, tenantsMap
    } = this.props

    return (
      <RouteSection>
        <Table multiSelectable onRowSelection={this.handleSelect}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>AccountID</TableHeaderColumn>
              <TableHeaderColumn>Tenant</TableHeaderColumn>
              <TableHeaderColumn>Tenancy</TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { Array.from(cloudaccountsMap.values()).map((cloudaccount) => {
              const {
                accountId, id, name, note, tenancy, vendor,
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
                  <TableRowColumn>{note}</TableRowColumn>
                </TableRow>
              )
            }) }
          </TableBody>
        </Table>

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
  selectedCloudaccounts: PropTypes.instanceOf(Set),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  requestCloudaccounts: PropTypes.func,
  selectCloudaccounts: PropTypes.func
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state),
  selectedCloudaccounts: getSelectedCloudaccounts(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  requestCloudaccounts,
  selectCloudaccounts
}
export default connect(mapStateToProps, mapDispatchToProps)(Cloudaccounts)
