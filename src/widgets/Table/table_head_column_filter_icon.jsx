import React, { PropTypes } from 'react';

const TableHeadColumnFilterIcon = (props) => {
  const {
    endpoint,
    column,
    columnFilterSet,
  } = props;
  const handleClick = (e) => {
    e.stopPropagation();
    const { left: positionX, bottom: positionY } = e.currentTarget.getBoundingClientRect();
    columnFilterSet({
      columnId: column.id,
      isVisible: true,
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
