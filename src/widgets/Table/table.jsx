import React, { Component, PropTypes } from 'react';

// Widgets
import TableHead from './table_head';
import TableHeadColumn from './table_head_column';
import TableRow from './table_row';
import TableHeadRowDropTarget from './table_head_row_drop_target';

class Table extends Component {
  componentWillMount() {
    this.props.fetchColumns();
    this.props.fetchData();
  }
  componentWillReceiveProps(nextProps) {
    const { sorts, filters, submittedFilters, pagination } = nextProps;
    if (JSON.stringify(submittedFilters) !== JSON.stringify(this.props.submittedFilters)
    || JSON.stringify(sorts) !== JSON.stringify(this.props.sorts)
    || JSON.stringify(pagination) !== JSON.stringify(this.props.pagination)) {
      this.props.fetchData({
        filters: submittedFilters,
        sorts,
        pagination,
      });
    }
  }
  render() {
    return (
      <table className="ReactDnDTable">
        <TableHead>
          <TableHeadRowDropTarget resizeColumn={this.props.resizeColumn}>
            {this.props.columns.map(column =>
              <TableHeadColumn
                key={column.id}
                column={column}
                {...this.props}
              />,
            )}
          </TableHeadRowDropTarget>
        </TableHead>
        <tbody>
          {this.props.data.map(row =>
            <TableRow
              key={row.id}
              row={row}
              {...this.props}
            />,
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  fetchData: PropTypes.func.isRequired,
  fetchColumns: PropTypes.func.isRequired,
  resizeColumn: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
