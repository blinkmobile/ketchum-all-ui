import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { IndexRedirect, Router, Route, hashHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Projects from './routes/Projects.js'
import Services from './routes/Services.js'
import Solutions from './routes/Solutions.js'
import Tenants from './routes/Tenants.js'

import App from './App.js'
import './index.css'

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to='/solutions' />
        <Route path='projects' component={Projects} />
        <Route path='services' component={Services} />
        <Route path='solutions' component={Solutions} />
        <Route path='tenants' component={Tenants} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
