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
import RouteSection from '../components/RouteSection.js'

import './Cloudaccounts.css'

class Cloudaccounts extends Component {
  componentDidMount () {
    this.props.requestCloudaccounts()
  }

  render () {
    const { cloudaccountsMap } = this.props

    return (
      <RouteSection>
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Label</TableHeaderColumn>
              <TableHeaderColumn>AccountID</TableHeaderColumn>
              <TableHeaderColumn>Tenancy</TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { Array.from(cloudaccountsMap.values()).map((cloudaccount) => {
              const {
                accountId, id, label, name, note, tenancy, vendor
              } = cloudaccount.toJS()
              return (
                <TableRow key={id}>
                  <TableRowColumn title={name}>{label}</TableRowColumn>
                  <TableRowColumn>{vendor} {accountId}</TableRowColumn>
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
  requestCloudaccounts: PropTypes.func,
  cloudaccountsMap: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state)
})
const mapDispatchToProps = { requestCloudaccounts }
export default connect(mapStateToProps, mapDispatchToProps)(Cloudaccounts)
