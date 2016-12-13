import { Map, Set } from 'immutable'
import ActionDelete from 'material-ui/svg-icons/action/delete-forever'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  deleteSelectedTenants, requestTenants, selectTenants
} from '../redux/actions/tenants.js'
import { getSelectedTenants, getTenantsMap } from '../redux/reducers/tenants.js'
import RouteSection from '../components/RouteSection.js'

import './Tenants.css'

class Tenants extends Component {
  constructor (props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount () {
    const { requestTenants } = this.props
    requestTenants()
  }

  handleSelect (rowsSelected) {
    const { selectTenants, tenantsMap } = this.props
    const rows = Array.from(tenantsMap.values())
    let selectedTenants
    if (rowsSelected === 'all') {
      selectedTenants = rows.map((tenant) => tenant.get('id'))
    } else if (Array.isArray(rowsSelected)) {
      selectedTenants = rows
        .filter((tenant, index) => rowsSelected.includes(index))
        .map((tenant) => tenant.get('id'))
    }
    selectTenants(selectedTenants)
  }

  render () {
    const {
      children, deleteSelectedTenants, selectedTenants, tenantsMap
    } = this.props

    return (
      <RouteSection>
        <Table multiSelectable onRowSelection={this.handleSelect}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Label</TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            { Array.from(tenantsMap.values()).map((tenant) => {
              const { id, label, name, note } = tenant.toJS()
              return (
                <TableRow key={id} selected={selectedTenants.has(id)}>
                  <TableRowColumn title={name}>{label}</TableRowColumn>
                  <TableRowColumn>{note}</TableRowColumn>
                </TableRow>
              )
            }) }
          </TableBody>
        </Table>

        <Link to='/tenants/new'>
          <FloatingActionButton className='TenantAddFAB' title='add'>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        <FloatingActionButton className='TenantsDeleteFAB' secondary title='delete' onClick={deleteSelectedTenants}>
          <ActionDelete />
        </FloatingActionButton>

        {children}
      </RouteSection>
    )
  }
}

Tenants.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  tenantsMap: PropTypes.instanceOf(Map),
  selectedTenants: PropTypes.instanceOf(Set),

  // mapDispatchToProps
  deleteSelectedTenants: PropTypes.func,
  requestTenants: PropTypes.func,
  selectTenants: PropTypes.func
}

const mapStateToProps = (state) => ({
  selectedTenants: getSelectedTenants(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  deleteSelectedTenants,
  requestTenants,
  selectTenants
}
export default connect(mapStateToProps, mapDispatchToProps)(Tenants)
