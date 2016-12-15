import { Map } from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteServicesSubmit } from '../redux/actions/services.js'
import { getCloudaccountsMap } from '../redux/reducers/cloudaccounts.js'
import { getServicesMap } from '../redux/reducers/services.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

import NotFound from './NotFound.js'
import ResourceCard from '../components/ResourceCard.js'
import RouteSection from '../components/RouteSection.js'

import './Service.css'

class Service extends PureComponent {
  constructor (props) {
    super(props)

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick () {
    const { deleteServicesSubmit, params: { id } } = this.props
    deleteServicesSubmit(id)
  }

  render () {
    const {
      cloudaccountsMap, servicesMap, tenantsMap, params
    } = this.props
    const service = servicesMap.get(params.id)
    if (!service) {
      return <NotFound params={params} />
    }

    const tenantId = service.getIn([ 'tenant', 'id' ])
    let tenant
    if (tenantId && tenantsMap.has(tenantId)) {
      tenant = tenantsMap.get(tenantId)
    }

    return (
      <RouteSection>
        <ResourceCard resource={service} onDeleteClick={this.handleDeleteClick} />

        { tenant && (
          <ResourceCard resource={tenant} />
        ) }

        { service.get('cloudaccounts')
          .map((cloudaccount) => cloudaccount.get('id'))
          .filter((cloudaccountId) => cloudaccountsMap.has(cloudaccountId))
          .map((cloudaccountId) => (
            <ResourceCard key={cloudaccountId} resource={cloudaccountsMap.get(cloudaccountId)} />
          ))
        }
      </RouteSection>
    )
  }
}

Service.propTypes = {
  // injected by react-router
  params: PropTypes.object,

  // mapStateToProps
  cloudaccountsMap: PropTypes.instanceOf(Map),
  servicesMap: PropTypes.instanceOf(Map),
  tenantsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteServicesSubmit: PropTypes.func
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state),
  servicesMap: getServicesMap(state),
  tenantsMap: getTenantsMap(state)
})
const mapDispatchToProps = {
  deleteServicesSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(Service)
