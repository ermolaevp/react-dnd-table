import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './dnd_constants';

const columnResizerSource = {
  beginDrag(props, monitor, component) {
    return {
      ...props,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class TableHeadColumnResizer extends Component {
  render() {
    const {
      connectDragSource,
      isDragging,
    } = this.props;
    return connectDragSource(
      <span className={classnames(['ReactDnDTable-ColumnResizer', { isDragging }])} />,
    );
  }
}

TableHeadColumnResizer.propTypes = {
  id: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.COLUMN_RESIZER, columnResizerSource, collect)(TableHeadColumnResizer);
