import cn from 'classnames'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import React, { Component, PropTypes } from 'react'

import DrawerNavigation from './components/DrawerNavigation.js'
import DrawerProfile from './components/DrawerProfile.js'
import './App.css'

class App extends Component {
  constructor () {
    super()

    this.handleMenuButtonTap = this.handleMenuButtonTap.bind(this)
    this.state = {
      isDrawerOpen: true
    }
  }

  handleMenuButtonTap () {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  render () {
    const { isDrawerOpen } = this.state
    const { children } = this.props
    return (
      <div className='App'>
        <Drawer docked open={isDrawerOpen} width={256}>
          <DrawerProfile />
          <DrawerNavigation />
        </Drawer>

        <main className={cn('Main', isDrawerOpen && 'Main-drawer-open')}>
          <AppBar onLeftIconButtonTouchTap={this.handleMenuButtonTap} title='Ketchum-All Registry' />

          {children}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export default App
