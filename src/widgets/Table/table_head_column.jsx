import React, { PropTypes } from 'react';

import TableHeadColumnTitleDnD from './table_head_column_title_dnd';
import TableHeadColumnFilterIcon from './table_head_column_filter_icon';
import TableHeadColumnResizable from './table_head_column_resizable';
import TableHeadColumnTitleSortable from './table_head_column_title_sortable';

const TableHeadColumn = (props) => {
  let style = {};
  if (props.column.width) style = { width: props.column.width };
  return (
    <th
      id={props.column.id}
      style={style}
    >
      <span>
        <TableHeadColumnTitleDnD {...props} id={props.column.id} >
          <TableHeadColumnFilterIcon {...props} />
          <TableHeadColumnTitleSortable {...props} />
        </TableHeadColumnTitleDnD>
        <TableHeadColumnResizable {...props} id={props.column.id} />
      </span>
    </th>
  );
};

TableHeadColumn.propTypes = {
  column: PropTypes.object.isRequired,
};

export default TableHeadColumn;
