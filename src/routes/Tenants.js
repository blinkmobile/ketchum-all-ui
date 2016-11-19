import { Card, CardActions, CardHeader } from 'material-ui/Card'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import React, { Component } from 'react'

import RouteSection from '../components/RouteSection.js'

import './Tenants.css'

import { tenants } from '../../__tests__/fixtures/data.json'

class Tenants extends Component {
  render () {
    return (
      <RouteSection>
        { tenants.map((tenant) => (
          <Card key={tenant.id} className='TenantCard'>
            <CardHeader title={tenant.name} subtitle={tenant.description} />
            <CardActions />
          </Card>
        )) }
        <FloatingActionButton className='TenantAddFAB'>
          <ContentAdd />
        </FloatingActionButton>
      </RouteSection>
    )
  }
}

export default Tenants
