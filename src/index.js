import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import App from './App.js'
import './index.css'

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path='/' component={App} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
