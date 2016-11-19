import React, { PropTypes } from 'react'

import './RouteSection.css'

const RouteSection = ({ children }) => (
  <section className='RouteSection'>
    {children}
  </section>
)

RouteSection.propTypes = {
  children: PropTypes.node
}

export default RouteSection
