import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import React, { Component } from 'react'

import RouteSection from '../components/RouteSection.js'

import './Projects.css'

import { projects } from '../../__tests__/fixtures/data.json'

class Projects extends Component {
  render () {
    return (
      <RouteSection>
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Owner</TableHeaderColumn>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Service</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { projects.map((project) => (
              <TableRow key={project.id}>
                <TableRowColumn>{project.ownerTenant}</TableRowColumn>
                <TableRowColumn>{project.id}</TableRowColumn>
                <TableRowColumn>{project.name}</TableRowColumn>
                <TableRowColumn>{project.service}</TableRowColumn>
              </TableRow>
            )) }
          </TableBody>
        </Table>
        <FloatingActionButton className='ProjectAddFAB'>
          <ContentAdd />
        </FloatingActionButton>
      </RouteSection>
    )
  }
}

export default Projects
