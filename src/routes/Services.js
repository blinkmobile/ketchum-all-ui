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
import { requestServices } from '../redux/actions/services.js'
import { getServicesMap } from '../redux/reducers/services.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
import RouteSection from '../components/RouteSection.js'

import './Services.css'

class Services extends Component {
  constructor (props) {
    super(props)

    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount () {
    this.props.requestServices()
  }

  handleCellClick (row, col) {
    const { servicesMap, push } = this.props
    push('/services/' + rowIndexToResourceId(servicesMap, row))
  }

  render () {
    const {
      children, servicesMap, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'Label', 'Type', 'Tenant', 'Tenancy' ],
      onCellClick: this.handleCellClick
    }

    return (
      <RouteSection>
        <ResourceTable {...tableProps}>
          { resourceMapToArray(servicesMap).map((service) => {
            const {
              id, label, name, serviceType, tenancy,
              tenant: relatedTenant
            } = service.toJS()
            let tenantLabel = ''
            if (relatedTenant && tenantsMap.has(relatedTenant.id)) {
              tenantLabel = tenantsMap.get(relatedTenant.id).get('label')
            }
            return (
              <TableRow key={id}>
                <TableRowColumn title={name}>{label || name}</TableRowColumn>
                <TableRowColumn>{serviceType}</TableRowColumn>
                <TableRowColumn>{tenantLabel}</TableRowColumn>
                <TableRowColumn>{tenancy}</TableRowColumn>
              </TableRow>
            )
          }) }
        </ResourceTable>

        <Link to='/services/new'>
          <FloatingActionButton className='ServicesAddFAB' title='add'>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        {children}
      </RouteSection>
    )
  }
}

Services.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  servicesMap: PropTypes.instanceOf(Map),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  push: PropTypes.func,
  requestServices: PropTypes.func
}

const mapStateToProps = (state) => ({
  servicesMap: getServicesMap(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  push,
  requestServices
}
export default connect(mapStateToProps, mapDispatchToProps)(Services)
