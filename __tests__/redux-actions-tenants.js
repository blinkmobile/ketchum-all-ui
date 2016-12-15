/* @flow */

import * as actions from '../src/redux/actions/tenants.js'

Object.keys(actions).forEach((name) => {
  test(`action creator: ${name}`, () => {
    expect([ 'function' ].includes(typeof actions[name])).toBe(true)

    if (typeof actions[name] === 'function') {
      const action = actions[name]()
      expect(action).toBeDefined()
      expect([ 'function', 'object' ].includes(typeof action)).toBe(true)
    }
  })
})
