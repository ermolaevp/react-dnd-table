import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TableHeadColumnFilterIcon = (props) => {
  const {
    submittedFilters,
    column,
    columnFilterSet,
    closeColumnFilter,
    columnFilter,
  } = props;
  const isFiltered = (() => {
    const f = submittedFilters[column.id];
    if (f === null) return false;
    switch (typeof f) {
      case 'string':
        return f !== '';
      case 'object':
        return f.gte !== '' || f.lte !== '';
      case 'array':
        return f.length > 0;
      case 'undefined':
      default:
        return false;
    }
  })();
  const handleClick = (e) => {
    e.stopPropagation();
    const { left: positionX, bottom: positionY } = e.currentTarget.getBoundingClientRect();
    columnFilterSet({
      columnId: column.id,
      isVisible: !(columnFilter.isVisible && columnFilter.columnId === column.id),
      positionX,
      positionY,
    });
    // const clientWidth = window.innerWidth
    // || document.documentElement.clientWidth
    // || document.body.clientWidth;
    // const mostRightX = clientWidth - 320;
    // const { left: tablePositionX } = findDOMNode(this).getBoundingClientRect();
    // let { left: positionX, bottom: positionY } = e.currentTarget.getBoundingClientRect();
    // positionX = positionX > mostRightX ? mostRightX : positionX;
    // positionY = positionY + window.pageYOffset + 3,
    // handleClick({
    //   endpoint,
    //   column,
    //   positionX,
    //   positionY,
    // });
    //
  };
  return (
    <button
      title="Show filter"
      onClick={handleClick}
      className={classnames(['ReactDnDTable-TitleFilterIcon', { isFiltered }])}
    >
      &#8285;
    </button>
  );
};

TableHeadColumnFilterIcon.propTypes = {
  column: PropTypes.object.isRequired,
  columnFilterSet: PropTypes.func.isRequired,
};

export default TableHeadColumnFilterIcon;
