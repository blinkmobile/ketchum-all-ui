import { Map } from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form/immutable'

import NewProjectForm from '../components/NewProjectForm.js'
import { createProjectsSubmit } from '../redux/actions/projects.js'
import { validate } from '../forms/newproject.js'

import './ProjectsNew.css'

class ProjectsNew extends Component {
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

    const { createProjectsSubmit } = this.props
    const values = this.props.newproject || new Map()
    if (!Object.keys(validate(values)).length) {
      return createProjectsSubmit(values.toJS())
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
      title: 'New Project'
    }

    return (
      <Dialog {...dialogProps}>
        <NewProjectForm onSubmit={this.handleSubmit} />
      </Dialog>
    )
  }
}

ProjectsNew.propTypes = {
  // mapStateToProps
  newproject: PropTypes.object,

  // mapDispatchToProps
  createProjectsSubmit: PropTypes.func,

  // react-router
  router: PropTypes.object
}

const mapStateToProps = (state) => ({
  newproject: getFormValues('newproject')(state)
})
const mapDispatchToProps = {
  createProjectsSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsNew)
