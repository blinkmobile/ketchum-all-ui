import { Map } from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteTenantsSubmit } from '../redux/actions/tenants.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

import NotFound from './NotFound.js'
import ResourceCard from '../components/ResourceCard.js'
import RouteSection from '../components/RouteSection.js'

import './Tenant.css'

class Tenant extends PureComponent {
  constructor (props) {
    super(props)

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick () {
    const { deleteTenantsSubmit, params: { id } } = this.props
    deleteTenantsSubmit(id)
  }

  render () {
    const { tenantsMap, params } = this.props
    const tenant = tenantsMap.get(params.id)
    if (!tenant) {
      return <NotFound params={params} />
    }

    return (
      <RouteSection>
        <ResourceCard resource={tenant} onDeleteClick={this.handleDeleteClick} />

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

Tenant.propTypes = {
  // injected by react-router
  params: PropTypes.object,

  // mapStateToProps
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteTenantsSubmit: PropTypes.func
}

const mapStateToProps = (state) => ({
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  deleteTenantsSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(Tenant)
