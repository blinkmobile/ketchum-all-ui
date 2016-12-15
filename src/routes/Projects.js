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
import { requestProjects } from '../redux/actions/projects.js'
import { getProjectsMap } from '../redux/reducers/projects.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
import RouteSection from '../components/RouteSection.js'

import './Projects.css'

class Projects extends Component {
  constructor (props) {
    super(props)

    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount () {
    this.props.requestProjects()
  }

  handleCellClick (row, col) {
    const { projectsMap, push } = this.props
    push('/projects/' + rowIndexToResourceId(projectsMap, row))
  }

  render () {
    const {
      children, projectsMap, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'Label', 'Type', 'Tenant', 'URL' ],
      onCellClick: this.handleCellClick
    }

    return (
      <RouteSection>
        <ResourceTable {...tableProps}>
          { resourceMapToArray(projectsMap).map((project) => {
            const {
              id, label, name, serviceType, url,
              customer: relatedTenant
            } = project.toJS()
            let tenantLabel = ''
            if (relatedTenant && tenantsMap.has(relatedTenant.id)) {
              tenantLabel = tenantsMap.get(relatedTenant.id).get('label')
            }
            return (
              <TableRow key={id}>
                <TableRowColumn title={name}>{label || name}</TableRowColumn>
                <TableRowColumn>{serviceType}</TableRowColumn>
                <TableRowColumn>{tenantLabel}</TableRowColumn>
                <TableRowColumn title={url}>{url}</TableRowColumn>
              </TableRow>
            )
          }) }
        </ResourceTable>

        <Link to='/projects/new'>
          <FloatingActionButton className='ProjectsAddFAB' title='add'>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        {children}
      </RouteSection>
    )
  }
}

Projects.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  projectsMap: PropTypes.instanceOf(Map),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  push: PropTypes.func,
  requestProjects: PropTypes.func
}

const mapStateToProps = (state) => ({
  projectsMap: getProjectsMap(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  push,
  requestProjects
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects)
