import { List, ListItem } from 'material-ui/List'
import React, { Component } from 'react'
import { Link } from 'react-router'

import CloudaccountIcon from './icons/cloudaccount.js'
import ProjectIcon from './icons/project.js'
import ServiceIcon from './icons/service.js'
import TenantIcon from './icons/tenant.js'

import './DrawerNavigation.css'

class DrawerNavigation extends Component {
  render () {
    return (
      <List>
        <Link to='/tenants' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Tenants' leftIcon={<TenantIcon />} />
        </Link>
        <Link to='/cloudaccounts' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Cloud Accounts' leftIcon={<CloudaccountIcon />} />
        </Link>
        <Link to='/services' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Services' leftIcon={<ServiceIcon />} />
        </Link>
        <Link to='/projects' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Projects' leftIcon={<ProjectIcon />} />
        </Link>
      </List>
    )
  }
}

export default DrawerNavigation
