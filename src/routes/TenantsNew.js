import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './TenantsNew.css'

class TenantsNew extends Component {
  constructor (props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.props.router.goBack()
  }

  render () {
    const dialogProps = {
      actions: [
        <RaisedButton label='Cancel' onClick={this.handleClose} />,
        <RaisedButton label='Create' primary onClick={this.handleClose} />
      ],
      modal: true,
      onRequestClose: this.handleClose,
      open: true,
      title: 'New Tenant'
    }

    return (
      <Dialog {...dialogProps}>
        <p>Hello, world!</p>
      </Dialog>
    )
  }
}

TenantsNew.propTypes = {
  // react-router
  router: PropTypes.object
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(TenantsNew)
