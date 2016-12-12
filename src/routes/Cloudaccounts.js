import { Map } from 'immutable'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { requestCloudaccounts } from '../redux/actions/cloudaccounts.js'
import { getCloudaccountsMap } from '../redux/reducers/cloudaccounts.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import RouteSection from '../components/RouteSection.js'

import './Cloudaccounts.css'

class Cloudaccounts extends Component {
  componentDidMount () {
    this.props.requestCloudaccounts()
  }

  render () {
    const { cloudaccountsMap, tenantsMap } = this.props

    return (
      <RouteSection>
        <Table multiSelectable>
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
                <TableRow key={id}>
                  <TableRowColumn title={name}>{vendor} {accountId}</TableRowColumn>
                  <TableRowColumn>{tenantLabel}</TableRowColumn>
                  <TableRowColumn>{tenancy}</TableRowColumn>
                  <TableRowColumn>{note}</TableRowColumn>
                </TableRow>
              )
            }) }
          </TableBody>
        </Table>
        <FloatingActionButton className='CloudaccountsAddFAB'>
          <ContentAdd />
        </FloatingActionButton>
      </RouteSection>
    )
  }
}

Cloudaccounts.propTypes = {
  // mapStateToProps
  cloudaccountsMap: PropTypes.instanceOf(Map),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  requestCloudaccounts: PropTypes.func
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = { requestCloudaccounts }
export default connect(mapStateToProps, mapDispatchToProps)(Cloudaccounts)
