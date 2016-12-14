import { Map } from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form/immutable'

import NewService from '../components/forms/NewService.js'
import { createServicesSubmit } from '../redux/actions/services.js'
import { validate } from '../forms/newservice.js'

import './ServicesNew.css'

class ServicesNew extends Component {
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

    const { createServicesSubmit } = this.props
    const values = this.props.newservice || new Map()
    if (!Object.keys(validate(values)).length) {
      return createServicesSubmit(values.toJS())
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
      title: 'New Service'
    }

    return (
      <Dialog {...dialogProps}>
        <NewService onSubmit={this.handleSubmit} />
      </Dialog>
    )
  }
}

ServicesNew.propTypes = {
  // mapStateToProps
  newservice: PropTypes.object,

  // mapDispatchToProps
  createServicesSubmit: PropTypes.func,

  // react-router
  router: PropTypes.object
}

const mapStateToProps = (state) => ({
  newservice: getFormValues('newservice')(state)
})
const mapDispatchToProps = {
  createServicesSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(ServicesNew)
