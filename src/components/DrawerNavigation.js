import { List, ListItem } from 'material-ui/List'
import Cloud from 'material-ui/svg-icons/file/cloud'
import Folder from 'material-ui/svg-icons/file/folder'
import Business from 'material-ui/svg-icons/communication/business'
import Work from 'material-ui/svg-icons/action/work'
import React, { Component } from 'react'
import { Link } from 'react-router'

import './DrawerNavigation.css'

class DrawerNavigation extends Component {
  render () {
    return (
      <List>
        <Link to='/' className='DrawerNavigationLink'>
          <ListItem primaryText='Solutions' leftIcon={<Work />} />
        </Link>
        <Link to='/' className='DrawerNavigationLink'>
          <ListItem primaryText='Projects' leftIcon={<Folder />} />
        </Link>
        <Link to='/' className='DrawerNavigationLink'>
          <ListItem primaryText='Services' leftIcon={<Cloud />} />
        </Link>
        <Link to='/' className='DrawerNavigationLink'>
          <ListItem primaryText='Tenants' leftIcon={<Business />} />
        </Link>
      </List>
    )
  }
}

export default DrawerNavigation
