import { Map } from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form/immutable'

import NewTenantForm from '../components/NewTenantForm.js'
import { createTenantsSubmit } from '../redux/actions/tenants.js'
import { validate } from '../forms/newtenant.js'

import './TenantsNew.css'

class TenantsNew extends Component {
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

    const { createTenantsSubmit } = this.props
    const values = this.props.newtenant || new Map()
    if (!Object.keys(validate(values)).length) {
      return createTenantsSubmit(values.toJS())
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
      title: 'New Tenant'
    }

    return (
      <Dialog {...dialogProps}>
        <NewTenantForm onSubmit={this.handleSubmit} />
      </Dialog>
    )
  }
}

TenantsNew.propTypes = {
  // mapStateToProps
  newtenant: PropTypes.object,

  // mapDispatchToProps
  createTenantsSubmit: PropTypes.func,

  // react-router
  router: PropTypes.object
}

const mapStateToProps = (state) => ({
  newtenant: getFormValues('newtenant')(state)
})
const mapDispatchToProps = {
  createTenantsSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(TenantsNew)
