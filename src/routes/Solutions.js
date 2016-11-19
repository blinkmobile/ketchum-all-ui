import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import React, { Component } from 'react'

import RouteSection from '../components/RouteSection.js'

import './Solutions.css'

import { solutions } from '../../__tests__/fixtures/data.json'

class Solutions extends Component {
  render () {
    return (
      <RouteSection>
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Owner</TableHeaderColumn>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { solutions.map((solution) => (
              <TableRow key={solution.id}>
                <TableRowColumn>{solution.ownerTenant}</TableRowColumn>
                <TableRowColumn>{solution.id}</TableRowColumn>
                <TableRowColumn>{solution.name}</TableRowColumn>
              </TableRow>
            )) }
          </TableBody>
        </Table>
        <FloatingActionButton className='SolutionAddFAB'>
          <ContentAdd />
        </FloatingActionButton>
      </RouteSection>
    )
  }
}

export default Solutions
