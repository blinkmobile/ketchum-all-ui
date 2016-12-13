import React from 'react'

import { shallow } from 'enzyme'

import App from '../src/App.js'

it('renders without crashing', () => {
  shallow(<App />)
})
