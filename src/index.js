import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRedirect, Router, Route } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Login from './routes/Login.js'
import Cloudaccounts from './routes/Cloudaccounts.js'
import Projects from './routes/Projects.js'
import Services from './routes/Services.js'
import Solutions from './routes/Solutions.js'
import Tenants from './routes/Tenants.js'

import { store, history } from './redux/store.js'

import App from './App.js'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRedirect to='/solutions' />
          <Route path='cloudaccounts' component={Cloudaccounts} />
          <Route path='login' component={Login} />
          <Route path='projects' component={Projects} />
          <Route path='services' component={Services} />
          <Route path='solutions' component={Solutions} />
          <Route path='tenants' component={Tenants} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
