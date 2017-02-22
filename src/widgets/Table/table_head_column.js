import React, { PropTypes } from 'react';

const TableHeadColumn = (props) => {
  let style = {};
  if (props.width) style = { width: props.width };
  return (
    <th style={style}>
      {props.children}
    </th>
  );
};

TableHeadColumn.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  children: PropTypes.Component,
};

export default TableHeadColumn;
