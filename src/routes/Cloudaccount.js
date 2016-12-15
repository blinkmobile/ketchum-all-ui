import { Map } from 'immutable'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteCloudaccountsSubmit } from '../redux/actions/cloudaccounts.js'
import { getCloudaccountsMap } from '../redux/reducers/cloudaccounts.js'

import NotFound from './NotFound.js'
import RouteSection from '../components/RouteSection.js'

import './Cloudaccount.css'

class Cloudaccount extends PureComponent {
  constructor (props) {
    super(props)

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick () {
    const { deleteCloudaccountsSubmit, params: { id } } = this.props
    deleteCloudaccountsSubmit(id)
  }

  render () {
    const { cloudaccountsMap, params } = this.props
    const cloudaccount = cloudaccountsMap.get(params.id)
    if (!cloudaccount) {
      return <NotFound params={params} />
    }

    const json = JSON.stringify(cloudaccount.toJS(), null, 2)
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

Cloudaccount.propTypes = {
  // injected by react-router
  params: PropTypes.object,

  // mapStateToProps
  cloudaccountsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteCloudaccountsSubmit: PropTypes.func
}

const mapStateToProps = (state) => ({
  cloudaccountsMap: getCloudaccountsMap(state)
})
const mapDispatchToProps = {
  deleteCloudaccountsSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(Cloudaccount)
