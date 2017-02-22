import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

const columnResizerSource = {
  beginDrag(props, monitor, component) {
    return {
      ...props
      // headColumnRect: findDOMNode(props.headColumn).getBoundingClientRect()
    };
  },
  endDrag(props, monitor, component) {
    // console.log(findDOMNode(component).getBoundingClientRect())
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class TableHeadColumnResizer extends Component {
  render() {
    const {
      id,
      connectDragSource,
      isDragging
    } = this.props;
    return connectDragSource(
      <div className={classnames(['column-resizer', { isDragging }])}></div>
    )
  }
}

TableHeadColumnResizer.propTypes = {
  id: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.COLUMN_RESIZER, columnResizerSource, collect)(TableHeadColumnResizer);
