import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import classnames from 'classnames';
import { ItemTypes } from './dnd_constants';

const columnResizerTarget = {
  hover(props, monitor, component) {
    // const {id, endpoint} = monitor.getItem()
    // const headColumn = document.querySelector(`table.table-${endpoint} th.${id}-column`)
    // const width = monitor.getClientOffset().x - headColumn.getBoundingClientRect().left
    //
    // props.resizeColumn(endpoint, id, width)
  },
  drop(props, monitor, component) {
    const componentCoords = findDOMNode(component).getBoundingClientRect();
    const componentWidth = componentCoords.right - componentCoords.left;
    const id = monitor.getItem().id;

    const headColumn = document.querySelector(`th[id="${id}"]`);
    const headColumnCoords = headColumn.getBoundingClientRect();
    const nextHeadColumn = headColumn.nextSibling;
    const nextHeadColumnCoords = nextHeadColumn.getBoundingClientRect();

    const nextColumnId = nextHeadColumn.getAttribute('id');

    let mousePositionX = monitor.getClientOffset().x;

    const minColWidth = 100;

    if (mousePositionX > (nextHeadColumnCoords.right - minColWidth)) mousePositionX = nextHeadColumnCoords.right - minColWidth;
    if (mousePositionX < (headColumnCoords.left + minColWidth)) mousePositionX = headColumnCoords.left + minColWidth;

    const headColumnWidth = mousePositionX - headColumnCoords.left;
    const nextHeadColumnWidth = nextHeadColumnCoords.right - mousePositionX;
    const width = `${(headColumnWidth * 100 / componentWidth).toFixed(4)}%`;
    const nextWidth = `${(nextHeadColumnWidth * 100 / componentWidth).toFixed(4)}%`;
    props.resizeColumn(id, width);
    props.resizeColumn(nextColumnId, nextWidth);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class TableHeadRowDropTarget extends Component {
  render() {
    const { isOver } = this.props;
    return this.props.connectDropTarget(
      <tr className={classnames([{ isOver }])}>
        {this.props.children}
      </tr>,
    );
  }
}

TableHeadRowDropTarget.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  resizeColumn: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.COLUMN_RESIZER, columnResizerTarget, collect)(TableHeadRowDropTarget);
