import React, { PropTypes } from 'react';

const TableHeadColumnTitleSortable = ({
  column,
  sorts,
  sortAscending,
  sortDescending,
  removeSorting,
}) => {
  const isSortedAsc = sorts[column.id] && sorts[column.id] === 'asc';
  const isSortedDesc = sorts[column.id] && sorts[column.id] === 'desc';
  const isUnsorted = !sorts[column.id];
  const mySort = () => {
    if (isUnsorted) return sortAscending(column.id);
    if (isSortedAsc) return sortDescending(column.id);
    if (isSortedDesc) return removeSorting(column.id);
    return false;
  };
  return (
    <span>
      <button onClick={mySort}>
        {column.title}
        { isSortedAsc && <span className="">&uarr;</span> }
        { isSortedDesc && <span className="">&darr;</span> }
      </button>
    </span>
  );
};

TableHeadColumnTitleSortable.propTypes = {
  column: PropTypes.object.isRequired,
  sortAscending: PropTypes.func.isRequired,
  sortDescending: PropTypes.func.isRequired,
  removeSorting: PropTypes.func.isRequired,
};

export default TableHeadColumnTitleSortable;
