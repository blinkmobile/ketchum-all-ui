import { Map } from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteProjectsSubmit } from '../redux/actions/projects.js'
import { getProjectsMap } from '../redux/reducers/projects.js'
import { getServicesMap } from '../redux/reducers/services.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

import NotFound from './NotFound.js'
import ResourceCard from '../components/ResourceCard.js'
import RouteSection from '../components/RouteSection.js'

import './Project.css'

class Project extends PureComponent {
  constructor (props) {
    super(props)

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick () {
    const { deleteProjectsSubmit, params: { id } } = this.props
    deleteProjectsSubmit(id)
  }

  render () {
    const { projectsMap, servicesMap, tenantsMap, params } = this.props
    const project = projectsMap.get(params.id)
    if (!project) {
      return <NotFound params={params} />
    }

    const tenantId = project.getIn([ 'customer', 'id' ])
    let tenant
    if (tenantId && tenantsMap.has(tenantId)) {
      tenant = tenantsMap.get(tenantId)
    }

    const serviceId = project.getIn([ 'service', 'id' ])
    let service
    if (serviceId && servicesMap.has(serviceId)) {
      service = servicesMap.get(serviceId)
    }

    return (
      <RouteSection>
        <ResourceCard resource={project} onDeleteClick={this.handleDeleteClick} />

        { tenant && (
          <ResourceCard resource={tenant} />
        ) }

        { service && (
          <ResourceCard resource={service} />
        ) }

        { tenant.get('partners')
          .map((tenant) => tenant.get('id'))
          .filter((tenantId) => tenantsMap.has(tenantId))
          .map((tenantId) => (
            <ResourceCard key={tenantId} resource={tenantsMap.get(tenantId)} />
          ))
        }
      </RouteSection>
    )
  }
}

Project.propTypes = {
  // injected by react-router
  params: PropTypes.object,

  // mapStateToProps
  projectsMap: PropTypes.instanceOf(Map),
  servicesMap: PropTypes.instanceOf(Map),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteProjectsSubmit: PropTypes.func
}

const mapStateToProps = (state) => ({
  projectsMap: getProjectsMap(state),
  servicesMap: getServicesMap(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  deleteProjectsSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(Project)
