import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import React, { Component } from 'react'

import FlexGrid from '../components/FlexGrid.js'
import RouteSection from '../components/RouteSection.js'

import './Tenants.css'

import { projects, solutions, tenants } from '../../__tests__/fixtures/data.json'

class Tenants extends Component {
  render () {
    return (
      <RouteSection>
        <FlexGrid>
          { tenants.map((tenant) => (
            <Card key={tenant.id}>
              <CardHeader title={tenant.name} subtitle={tenant.description} />
              <CardActions />
              <CardText>
                Projects {projects.filter((project) => project.ownerTenant === tenant.id).length}
                <br />
                Solutions {solutions.filter((solution) => solution.ownerTenant === tenant.id).length}
              </CardText>
            </Card>
          )) }
        </FlexGrid>
        <FloatingActionButton className='TenantAddFAB'>
          <ContentAdd />
        </FloatingActionButton>
      </RouteSection>
    )
  }
}

export default Tenants
