import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import React, { Component } from 'react'

import './DrawerProfile.css'

class DrawerProfile extends Component {
  constructor () {
    super()

    this.handleLogInClick = this.handleLogInClick.bind(this)
    this.handleLogOutClick = this.handleLogOutClick.bind(this)
    this.state = {
      isLoggedIn: false
    }
  }

  handleLogInClick () {
    this.setState({ isLoggedIn: true })
  }

  handleLogOutClick () {
    this.setState({ isLoggedIn: false })
  }

  render () {
    const { isLoggedIn } = this.state
    return isLoggedIn ? (
      <Card>
        <CardHeader title='Harry Potter' subtitle='hp@hogwarts.edu.uk' />
        <CardActions>
          <FlatButton label='log out' onClick={this.handleLogOutClick} />
        </CardActions>
      </Card>
    ) : (
      <Card>
        <CardHeader title='Guest' subtitle='anonymous' />
        <CardActions>
          <FlatButton label='log in' onClick={this.handleLogInClick} />
        </CardActions>
      </Card>
    )
  }
}

export default DrawerProfile
