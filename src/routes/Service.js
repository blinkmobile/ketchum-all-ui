import { Map } from 'immutable'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteServicesSubmit } from '../redux/actions/services.js'
import { getServicesMap } from '../redux/reducers/services.js'

import NotFound from './NotFound.js'
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

    const json = JSON.stringify(service.toJS(), null, 2)
    return (
      <RouteSection>
        <Paper style={{ padding: '1rem' }}>
          <pre><code>{json}</code></pre>
          <RaisedButton label='Delete' secondary onClick={this.handleDeleteClick} />
        </Paper>
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
