import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { logIn, logOut } from '../redux/actions/auth.js'
import { getToken } from '../redux/reducers/auth.js'
import RouteSection from '../components/RouteSection.js'

import './Login.css'

const PAPER_STYLE = {
  margin: '0 auto',
  marginTop: '20%',
  maxWidth: '20em',
  padding: '1rem'
}

class Login extends Component {
  constructor (...args) {
    super(...args)

    this.handleLogOutClick = this.handleLogOutClick.bind(this)
    this.handleTokenChange = this.handleTokenChange.bind(this)
  }

  handleLogOutClick () {
    this.props.logOut()
  }

  handleTokenChange (event, value) {
    this.props.logIn(value)
  }

  render () {
    const { token } = this.props

    return (
      <RouteSection>
        <Paper style={PAPER_STYLE}>
          <TextField hintText='abc123' floatingLabelText='Authentication Token' fullWidth type='password' onChange={this.handleTokenChange} value={token} />
          <div className='Login__buttons'>
            { token && (
              <RaisedButton label='Log Out' primary onClick={this.handleLogOutClick} />
            ) }
          </div>
        </Paper>
      </RouteSection>
    )
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  token: PropTypes.string
}

const mapStateToProps = (state) => ({
  token: getToken(state)
})
const mapDispatchToProps = { logIn, logOut }
export default connect(mapStateToProps, mapDispatchToProps)(Login)
