/* @flow */

import * as actions from '../src/redux/actions/auth.js'

Object.keys(actions).forEach((name) => {
  test(`action creator: ${name}`, () => {
    expect([ 'function', 'string' ].includes(typeof actions[name])).toBe(true)

    if (typeof actions[name] === 'string') {
      expect(name).toBe(actions[name]) // CONSTANT = 'CONSTANT'
    }
  })
})

test('exports required action creator functions', () => {
  const names = [
    'logIn',
    'logOut'
  ]
  expect(names.every((name) => Object.keys(actions).includes(name))).toBe(true)
})
