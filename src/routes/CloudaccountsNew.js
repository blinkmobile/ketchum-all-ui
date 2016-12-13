import { Map } from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form/immutable'

import NewCloudaccountsForm from '../components/NewCloudaccountsForm.js'
import { createCloudaccountsSubmit } from '../redux/actions/cloudaccounts.js'
import { validate } from '../forms/newcloudaccounts.js'

import './CloudaccountsNew.css'

class CloudaccountsNew extends Component {
  constructor (props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose () {
    this.props.router.goBack()
  }

  handleSubmit (event) {
    event.preventDefault()

    const { createCloudaccountsSubmit } = this.props
    const values = this.props.newcloudaccount || new Map()
    if (!Object.keys(validate(values)).length) {
      return createCloudaccountsSubmit(values.toJS())
    }
  }

  render () {
    const dialogProps = {
      actions: [
        <FlatButton label='Cancel' onClick={this.handleClose} />,
        <RaisedButton label='Create' primary onClick={this.handleSubmit} />
      ],
      autoScrollBodyContent: true,
      onRequestClose: this.handleClose,
      open: true,
      title: 'New Cloud Account'
    }

    return (
      <Dialog {...dialogProps}>
        <NewCloudaccountsForm onSubmit={this.handleSubmit} />
      </Dialog>
    )
  }
}

CloudaccountsNew.propTypes = {
  // mapStateToProps
  newcloudaccount: PropTypes.object,

  // mapDispatchToProps
  createCloudaccountsSubmit: PropTypes.func,

  // react-router
  router: PropTypes.object
}

const mapStateToProps = (state) => ({
  newcloudaccount: getFormValues('newcloudaccount')(state)
})
const mapDispatchToProps = {
  createCloudaccountsSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(CloudaccountsNew)
