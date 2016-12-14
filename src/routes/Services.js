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
  deleteSelectedServices, requestServices, selectServices
} from '../redux/actions/services.js'
import {
  getServicesMap, getSelectedServices
} from '../redux/reducers/services.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
import RouteSection from '../components/RouteSection.js'

import './Services.css'

class Services extends Component {
  constructor (props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount () {
    this.props.requestServices()
  }

  handleSelect (rowsSelected) {
    const { selectServices, servicesMap } = this.props
    const selectedServices = rowIndicesToResourceIds(
      servicesMap,
      rowsSelected
    )
    selectServices(selectedServices)
  }

  render () {
    const {
      children, servicesMap, deleteSelectedServices, selectedServices, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'Label', 'Type', 'Tenant', 'Tenancy' ],
      onSelect: this.handleSelect
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
              <TableRow key={id} selected={selectedServices.has(id)}>
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

        <FloatingActionButton className='ServicesDeleteFAB' secondary title='delete' onClick={deleteSelectedServices}>
          <ActionDelete />
        </FloatingActionButton>

        {children}
      </RouteSection>
    )
  }
}

Services.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  servicesMap: PropTypes.instanceOf(Map),
  selectedServices: PropTypes.instanceOf(Set),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteSelectedServices: PropTypes.func,
  requestServices: PropTypes.func,
  selectServices: PropTypes.func
}

const mapStateToProps = (state) => ({
  servicesMap: getServicesMap(state),
  selectedServices: getSelectedServices(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  deleteSelectedServices,
  requestServices,
  selectServices
}
export default connect(mapStateToProps, mapDispatchToProps)(Services)
