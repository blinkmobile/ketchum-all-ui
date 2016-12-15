import { Map } from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteCloudaccountsSubmit } from '../redux/actions/cloudaccounts.js'
import { getCloudaccountsMap } from '../redux/reducers/cloudaccounts.js'

import NotFound from './NotFound.js'
import ResourceCard from '../components/ResourceCard.js'
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

    return (
      <RouteSection>
        <ResourceCard resource={cloudaccount} onDeleteClick={this.handleDeleteClick} />
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
