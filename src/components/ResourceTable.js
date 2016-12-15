import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow
} from 'material-ui/Table'
import React, { PropTypes } from 'react'

import './ResourceTable.css'

const ResourceTable = ({ children, headings, onCellClick }) => (
  <Table selectable={false} onCellClick={onCellClick}>
    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
      <TableRow>
        { headings.map((heading) => (
          <TableHeaderColumn key={heading}>{heading}</TableHeaderColumn>
        )) }
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {children}
    </TableBody>
  </Table>
)

ResourceTable.propTypes = {
  children: PropTypes.node,
  headings: PropTypes.array,
  onCellClick: PropTypes.func
}

export default ResourceTable
