import './css/table.css';
import './css/column-title-dnd.css';

import React, { Component, PropTypes } from 'react';

// Widgets
import TableHead from './table_head';
import TableHeadColumn from './table_head_column';
import TableRow from './table_row';
import TableHeadRowDropTarget from './table_head_row_drop_target';

class Table extends Component {
  componentWillMount() {
    this.props.fetchData(this.props.endpoint);
  }
  render() {
    return (
      <table>
        <TableHead>
          <TableHeadRowDropTarget resizeColumn={this.props.resizeColumn}>
            {this.props.columns.map((column, colIndex) =>
              <TableHeadColumn
                key={colIndex}
                column={column}
                {...this.props}
              />
            )}
          </TableHeadRowDropTarget>
        </TableHead>
        <tbody>
          {this.props.data.map((row, rowIndex) =>
            <TableRow
              key={rowIndex}
              row={row}
              {...this.props}
            />
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  endpoint: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  resizeColumn: PropTypes.func.isRequired,
};

export default Table;
