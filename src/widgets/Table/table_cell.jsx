import React, { PropTypes } from 'react';
import moment from 'moment';

const StringCell = ({ type, children }) => (
  <td className={type} title={children}>
    {children}
  </td>
);

StringCell.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

const DatetimeCell = ({ type, children }) => (
  <td className={type} title={children}>
    {moment(children).format('YYYY/MM/DD HH:mm:ss')}
  </td>
);

DatetimeCell.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Date).isRequired,
};

const Cell = ({ type, children }) => {
  switch (type) {
    case 'datetime':
      return <DatetimeCell type={type}>{new Date(children)}</DatetimeCell>;
    case 'string':
    default:
      return <StringCell type={type}>{children}</StringCell>;
  }
};

Cell.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number]).isRequired,
};

export default Cell;
