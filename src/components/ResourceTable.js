import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow
} from 'material-ui/Table'
import React, { PropTypes } from 'react'

import './ResourceTable.css'

const ResourceTable = ({ children, headings, onSelect }) => (
  <Table multiSelectable onRowSelection={onSelect}>
    <TableHeader>
      <TableRow>
        { headings.map((heading) => (
          <TableHeaderColumn key={heading}>{heading}</TableHeaderColumn>
        )) }
      </TableRow>
    </TableHeader>
    <TableBody deselectOnClickaway={false}>
      {children}
    </TableBody>
  </Table>
)

ResourceTable.propTypes = {
  children: PropTypes.node,
  headings: PropTypes.array,
  onSelect: PropTypes.func
}

export default ResourceTable
