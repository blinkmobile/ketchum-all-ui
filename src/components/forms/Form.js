import React, { PropTypes } from 'react'

import './Form.css'

const Form = ({ children, onSubmit }) => (
  <form className='Form' onSubmit={onSubmit}>{children}</form>
)

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func
}

export default Form
