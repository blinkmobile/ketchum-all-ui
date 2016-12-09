/* @flow */

export const LOG_IN = 'LOG_IN'
export const logIn = (token) => ({
  type: LOG_IN,
  payload: token
})

export const LOG_OUT = 'LOG_OUT'
export const logOut = () => ({ type: LOG_OUT })
