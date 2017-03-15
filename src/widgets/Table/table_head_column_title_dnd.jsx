import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import classnames from 'classnames';
import { ItemTypes } from './dnd_constants';

import TableHeadColumnResizable from './table_head_column_resizable';
import TableHeadColumnTitleDnDSource from './table_head_column_title_dnd_source';

const columnTitleTarget = {
  hover(props, monitor, component) {
    const source = monitor.getItem().id;
    const target = props.id;
    if (source === target) return;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    component.setState({ sourceOnTheLeft: hoverClientX < hoverMiddleX });
  },
  drop(props, monitor, component) {
    const source = monitor.getItem().id;
    const target = props.id;
    if (source === target) return;
    const { moveColumnLeft, moveColumnRight } = props;
    if (component.state.sourceOnTheLeft) {
      moveColumnLeft(source, target);
    } else {
      moveColumnRight(source, target);
    }
  },
};

const collectDrop = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  mousePosition: monitor.getClientOffset(),
});

class TableHeadColumnTitleDnD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceOnTheLeft: null,
    };
  }
  render() {
    const {
      column,
      connectDropTarget,
      isOver,
    } = this.props;
    return connectDropTarget(
      <div
        className={classnames([
          'column-title-dnd',
          {
            sourceOnTheLeft: isOver && this.state.sourceOnTheLeft === true,
            sourceOnTheRight: isOver && this.state.sourceOnTheLeft === false,
          },
        ])}
      >
        <TableHeadColumnTitleDnDSource id={column.id}>
          {this.props.children}
        </TableHeadColumnTitleDnDSource>
      </div>
    );
  }
}

TableHeadColumnTitleDnD.propTypes = {
  id: PropTypes.string.isRequired,
  column: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  moveColumnLeft: PropTypes.func.isRequired,
  moveColumnRight: PropTypes.func.isRequired,
  // added by decorator
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
}

export default DropTarget(ItemTypes.COLUMN_TITLE, columnTitleTarget, collectDrop)(TableHeadColumnTitleDnD);
