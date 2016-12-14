import { List, ListItem } from 'material-ui/List'
import Cloud from 'material-ui/svg-icons/file/cloud'
import CloudCircle from 'material-ui/svg-icons/file/cloud-circle'
import Folder from 'material-ui/svg-icons/file/folder'
import Business from 'material-ui/svg-icons/communication/business'
import React, { Component } from 'react'
import { Link } from 'react-router'

import './DrawerNavigation.css'

class DrawerNavigation extends Component {
  render () {
    return (
      <List>
        <Link to='/tenants' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Tenants' leftIcon={<Business />} />
        </Link>
        <Link to='/cloudaccounts' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Cloud Accounts' leftIcon={<CloudCircle />} />
        </Link>
        <Link to='/services' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Services' leftIcon={<Cloud />} />
        </Link>
        <Link to='/projects' className='DrawerNavLink' activeClassName='DrawerNavLink-active'>
          <ListItem primaryText='Projects' leftIcon={<Folder />} />
        </Link>
      </List>
    )
  }
}

export default DrawerNavigation
