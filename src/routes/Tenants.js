import { Map } from 'immutable'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { requestTenants } from '../redux/actions/tenants.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import RouteSection from '../components/RouteSection.js'

import './Tenants.css'

class Tenants extends Component {
  componentDidMount () {
    this.props.requestTenants()
  }

  render () {
    const { children, tenantsMap } = this.props

    return (
      <RouteSection>
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Label</TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { Array.from(tenantsMap.values()).map((tenant) => {
              const { id, label, name, note } = tenant.toJS()
              return (
                <TableRow key={id}>
                  <TableRowColumn title={name}>{label}</TableRowColumn>
                  <TableRowColumn>{note}</TableRowColumn>
                </TableRow>
              )
            }) }
          </TableBody>
        </Table>
        <Link to='/tenants/new'>
          <FloatingActionButton className='TenantAddFAB'>
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
  requestTenants: PropTypes.func
}

const mapStateToProps = (state) => ({
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = { requestTenants }
export default connect(mapStateToProps, mapDispatchToProps)(Tenants)
