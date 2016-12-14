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
  deleteSelectedTenants, requestTenants, selectTenants
} from '../redux/actions/tenants.js'
import { getSelectedTenants, getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
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
    const selectedTenants = rowIndicesToResourceIds(
      tenantsMap,
      rowsSelected
    )
    selectTenants(selectedTenants)
  }

  render () {
    const {
      children, deleteSelectedTenants, selectedTenants, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'Label', 'Note' ],
      onSelect: this.handleSelect
    }

    return (
      <RouteSection>
        <ResourceTable {...tableProps}>
          { resourceMapToArray(tenantsMap).map((tenant) => {
            const { id, label, name, note } = tenant.toJS()
            return (
              <TableRow key={id} selected={selectedTenants.has(id)}>
                <TableRowColumn title={name}>{label}</TableRowColumn>
                <TableRowColumn>{note}</TableRowColumn>
              </TableRow>
            )
          }) }
        </ResourceTable>

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
