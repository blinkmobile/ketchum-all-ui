import { Map } from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteServicesSubmit } from '../redux/actions/services.js'
import { getServicesMap } from '../redux/reducers/services.js'

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
    const { servicesMap, params } = this.props
    const service = servicesMap.get(params.id)
    if (!service) {
      return <NotFound params={params} />
    }

    return (
      <RouteSection>
        <ResourceCard resource={service} onDeleteClick={this.handleDeleteClick} />
      </RouteSection>
    )
  }
}

Service.propTypes = {
  // injected by react-router
  params: PropTypes.object,

  // mapStateToProps
  servicesMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteServicesSubmit: PropTypes.func
}

const mapStateToProps = (state) => ({
  servicesMap: getServicesMap(state)
})
const mapDispatchToProps = {
  deleteServicesSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(Service)
