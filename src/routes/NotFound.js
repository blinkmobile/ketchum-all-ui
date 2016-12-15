import Paper from 'material-ui/Paper'
import React, { PropTypes } from 'react'

import RouteSection from '../components/RouteSection.js'

import './NotFound.css'

const NotFound = ({ params: { id } }) => {
  return (
    <RouteSection>
      <Paper className='NotFound'>
        <h1>404 Not Found :(</h1>
      </Paper>
    </RouteSection>
  )
}

NotFound.propTypes = {
  // react-router
  params: PropTypes.object
}

export default NotFound
