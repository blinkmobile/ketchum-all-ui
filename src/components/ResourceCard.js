import { Map } from 'immutable'
import intersection from 'lodash.intersection'
import {
  Card, CardActions, CardHeader, CardText
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import React, { PropTypes } from 'react'

import CloudaccountIcon from './icons/cloudaccount.js'
import ProjectIcon from './icons/project.js'
import ServiceIcon from './icons/service.js'
import TenantIcon from './icons/tenant.js'

import './ResourceCard.css'

const TYPES = {
  cloudaccounts: {
    attributes: {
      accountId: 'Account ID',
      tenancy: 'Tenancy',
      vendor: 'Vendor'
    },
    Icon: CloudaccountIcon
  },
  projects: {
    attributes: {
      serviceType: 'Service Type',
      url: 'URL'
    },
    Icon: ProjectIcon
  },
  services: {
    attributes: {
      awsS3Bucket: 'AWS S3 Bucket',
      awsRoleArn: 'AWS Role ARN',
      origin: 'Origin',
      serviceType: 'Service Type',
      tenancy: 'Tenancy'
    },
    Icon: ServiceIcon
  },
  tenants: {
    attributes: {},
    Icon: TenantIcon
  }
}

const ResourceCard = ({ onDeleteClick, resource }) => {
  resource = resource.toJS()
  const { id, label, name, note, type } = resource
  const { attributes, Icon } = TYPES[type]

  const attrs = intersection(Object.keys(attributes), Object.keys(resource))

  return (
    <Card className='ResourceCard' title={id}>
      <CardHeader title={label || name} subtitle={name} avatar={<Icon />} />
      { attrs.map((name) => (
        <CardText key={name}>
          {attributes[name]}: {resource[name]}
        </CardText>
      )) }
      { note && (
        <CardText>Note: {note}</CardText>
      ) }
      <CardActions>
        { onDeleteClick && (
          <FlatButton label='Delete' secondary onClick={onDeleteClick} />
        ) }
      </CardActions>
    </Card>
  )
}

ResourceCard.propTypes = {
  onDeleteClick: PropTypes.func,
  resource: PropTypes.instanceOf(Map)
}

export default ResourceCard
