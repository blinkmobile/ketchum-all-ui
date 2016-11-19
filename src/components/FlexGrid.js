import React, { PropTypes } from 'react'

import './FlexGrid.css'

const FlexGrid = ({ children }) => (
  <div className='FlexGrid'>
    {children}
  </div>
)

FlexGrid.propTypes = {
  children: PropTypes.node
}

export default FlexGrid
