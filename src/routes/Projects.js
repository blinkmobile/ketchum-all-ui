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
  deleteSelectedProjects, requestProjects, selectProjects
} from '../redux/actions/projects.js'
import {
  getProjectsMap, getSelectedProjects
} from '../redux/reducers/projects.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'
import ResourceTable from '../components/ResourceTable.js'
import RouteSection from '../components/RouteSection.js'

import './Projects.css'

class Projects extends Component {
  constructor (props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount () {
    this.props.requestProjects()
  }

  handleSelect (rowsSelected) {
    const { selectProjects, projectsMap } = this.props
    const selectedProjects = rowIndicesToResourceIds(
      projectsMap,
      rowsSelected
    )
    selectProjects(selectedProjects)
  }

  render () {
    const {
      children, projectsMap, deleteSelectedProjects, selectedProjects, tenantsMap
    } = this.props

    const tableProps = {
      headings: [ 'Label', 'Type', 'Tenant', 'URL' ],
      onSelect: this.handleSelect
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
              <TableRow key={id} selected={selectedProjects.has(id)}>
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

        <FloatingActionButton className='ProjectsDeleteFAB' secondary title='delete' onClick={deleteSelectedProjects}>
          <ActionDelete />
        </FloatingActionButton>

        {children}
      </RouteSection>
    )
  }
}

Projects.propTypes = {
  children: PropTypes.element,

  // mapStateToProps
  projectsMap: PropTypes.instanceOf(Map),
  selectedProjects: PropTypes.instanceOf(Set),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteSelectedProjects: PropTypes.func,
  requestProjects: PropTypes.func,
  selectProjects: PropTypes.func
}

const mapStateToProps = (state) => ({
  projectsMap: getProjectsMap(state),
  selectedProjects: getSelectedProjects(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  deleteSelectedProjects,
  requestProjects,
  selectProjects
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects)
