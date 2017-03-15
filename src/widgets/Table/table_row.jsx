import React, { PropTypes } from 'react';

import TableCell from './table_cell';

const TableRow = ({
  columns,
  row,
  handleRowClick,
}) => {
  let coursorPositionX = null;
  const setCursorPositionX = e => {
    coursorPositionX = e.clientX;
    return false;
  };
  const handleMouseClick = e => {
    if (e.button !== 2 && coursorPositionX === e.clientX) {
      handleRowClick(row);
    } else {
      coursorPositionX = null;
    }
  };
  const colElems = columns.map((column, colIndex) => {
    const colContent = row[column.id];
    return (typeof colContent === 'undefined' || colContent === null)
      ? <td key={colIndex}></td>
      : <TableCell key={colIndex} {...column}>{colContent}</TableCell>;
  });
  return (
    <tr
      onMouseDown={setCursorPositionX}
      onMouseUp={handleMouseClick}
    >
      {colElems}
    </tr>
  );
};

TableRow.propTypes = {
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  handleRowClick: PropTypes.func.isRequired,
};

export default TableRow;
