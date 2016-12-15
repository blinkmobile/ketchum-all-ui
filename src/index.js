/* @flow */

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRedirect, Router, Route } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Login from './routes/Login.js'
import Cloudaccount from './routes/Cloudaccount.js'
import Cloudaccounts from './routes/Cloudaccounts.js'
import CloudaccountsNew from './routes/CloudaccountsNew.js'
import Project from './routes/Project.js'
import Projects from './routes/Projects.js'
import ProjectsNew from './routes/ProjectsNew.js'
import Service from './routes/Service.js'
import Services from './routes/Services.js'
import ServicesNew from './routes/ServicesNew.js'
import Tenant from './routes/Tenant.js'
import Tenants from './routes/Tenants.js'
import TenantsNew from './routes/TenantsNew.js'

import { store, history } from './redux/store.js'

import App from './App.js'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRedirect to='/tenants' />

          <Route path='cloudaccounts' component={Cloudaccounts}>
            <Route path='new' component={CloudaccountsNew} />
          </Route>
          <Route path='cloudaccounts/:id' component={Cloudaccount} />

          <Route path='login' component={Login} />

          <Route path='projects' component={Projects}>
            <Route path='new' component={ProjectsNew} />
          </Route>
          <Route path='projects/:id' component={Project} />

          <Route path='services' component={Services}>
            <Route path='new' component={ServicesNew} />
          </Route>
          <Route path='services/:id' component={Service} />

          <Route path='tenants' component={Tenants}>
            <Route path='new' component={TenantsNew} />
          </Route>
          <Route path='tenants/:id' component={Tenant} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
