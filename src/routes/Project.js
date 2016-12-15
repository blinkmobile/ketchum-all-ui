import { Map } from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'

import { deleteProjectsSubmit } from '../redux/actions/projects.js'
import { getProjectsMap } from '../redux/reducers/projects.js'

import NotFound from './NotFound.js'
import ResourceCard from '../components/ResourceCard.js'
import RouteSection from '../components/RouteSection.js'

import './Project.css'

class Project extends PureComponent {
  constructor (props) {
    super(props)

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick () {
    const { deleteProjectsSubmit, params: { id } } = this.props
    deleteProjectsSubmit(id)
  }

  render () {
    const { projectsMap, params } = this.props
    const project = projectsMap.get(params.id)
    if (!project) {
      return <NotFound params={params} />
    }

    return (
      <RouteSection>
        <ResourceCard resource={project} onDeleteClick={this.handleDeleteClick} />
      </RouteSection>
    )
  }
}

Project.propTypes = {
  // injected by react-router
  params: PropTypes.object,

  // mapStateToProps
  projectsMap: PropTypes.instanceOf(Map),

  // mapDispatchToProps
  deleteProjectsSubmit: PropTypes.func
}

const mapStateToProps = (state) => ({
  projectsMap: getProjectsMap(state)
})
const mapDispatchToProps = {
  deleteProjectsSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(Project)
