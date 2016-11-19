import cn from 'classnames'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import React, { Component } from 'react'

import DrawerProfile from './components/DrawerProfile'
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
    return (
      <div className='App'>
        <Drawer docked open={isDrawerOpen} width={256}>
          <DrawerProfile />
        </Drawer>

        <main className={cn('Main', isDrawerOpen && 'Main-drawer-open')}>
          <AppBar onLeftIconButtonTouchTap={this.handleMenuButtonTap} title='Ketchum-All Registry' />

          <p className='App-intro'>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </main>
      </div>
    )
  }
}

export default App
