import { Map } from 'immutable'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteTenantsSubmit } from '../redux/actions/tenants.js'
import { getTenantsMap } from '../redux/reducers/tenants.js'

import NotFound from './NotFound.js'
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

    const json = JSON.stringify(tenant.toJS(), null, 2)
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
