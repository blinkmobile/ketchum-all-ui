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
import { requestTenants } from '../redux/actions/tenants.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
import RouteSection from '../components/RouteSection.js'

import './Tenants.css'

class Tenants extends Component {
  constructor (props) {
    super(props)

    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount () {
    const { requestTenants } = this.props
    requestTenants()
  }

  handleCellClick (row, col) {
    const { tenantsMap, push } = this.props
    push('/tenants/' + rowIndexToResourceId(tenantsMap, row))
  }

  render () {
    const {
      children, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'Label', 'Note' ],
      onCellClick: this.handleCellClick
    }

    return (
      <RouteSection>
        <ResourceTable {...tableProps}>
          { resourceMapToArray(tenantsMap).map((tenant) => {
            const { id, label, name, note } = tenant.toJS()
            return (
              <TableRow key={id}>
                <TableRowColumn title={name}>{label || name}</TableRowColumn>
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

        {children}
      </RouteSection>
    )
  }
}

Tenants.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  push: PropTypes.func,
  requestTenants: PropTypes.func
}

const mapStateToProps = (state) => ({
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  push,
  requestTenants
}
export default connect(mapStateToProps, mapDispatchToProps)(Tenants)
