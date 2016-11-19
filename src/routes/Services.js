import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import React, { Component } from 'react'

import FlexGrid from '../components/FlexGrid.js'
import RouteSection from '../components/RouteSection.js'

import './Services.css'

import { projects, services } from '../../__tests__/fixtures/data.json'

class Services extends Component {
  render () {
    return (
      <RouteSection>
        <FlexGrid>
          { services.map((service) => (
            <Card key={service.id}>
              <CardHeader title={service.name} subtitle={service.description} />
              <CardActions />
              <CardText>
                Projects {projects.filter((project) => project.service === service.id).length}
              </CardText>
            </Card>
          )) }
        </FlexGrid>
        <FloatingActionButton className='ServiceAddFAB'>
          <ContentAdd />
        </FloatingActionButton>
      </RouteSection>
    )
  }
}

export default Services
