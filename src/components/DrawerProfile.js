import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { getToken } from '../redux/reducers/auth.js'

import './DrawerProfile.css'

class DrawerProfile extends Component {
  render () {
    const { token } = this.props
    return token ? (
      <Card>
        <CardHeader title='Harry Potter' subtitle='hp@hogwarts.edu.uk' />
        <CardActions>
          <Link to='/login'>
            <FlatButton label='Log Out' />
          </Link>
        </CardActions>
      </Card>
    ) : (
      <Card>
        <CardHeader title='Guest' subtitle='anonymous' />
        <CardActions>
          <Link to='/login'>
            <FlatButton label='Log In' />
          </Link>
        </CardActions>
      </Card>
    )
  }
}

DrawerProfile.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = (state) => ({
  token: getToken(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerProfile)
