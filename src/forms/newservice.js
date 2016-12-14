/* @flow */

export const preSubmit = (values /* : Object */) /* : Object */ => values

export const validate = (values /* : Object */) => {
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'required'
  } else if (values.get('name').length < 2) {
    errors.name = 'at least 2 characters'
  } else if (!/^[a-z][a-z-]+$/.test(values.get('name'))) {
    errors.name = 'use lowercase letters and hyphens'
  }
  return errors
}
