import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import classnames from 'classnames';
import { ItemTypes } from './dnd_constants';

const columnTitleSource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
  },
  endDrag(props, monitor, component) {
    let target = props.id;
    const dropResult = monitor.getDropResult();
    if (dropResult !== null) target = dropResult.id;
    return {
      source: props.id,
      target,
    };
  },
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class TableHeadColumnTitleDnDSource extends Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div className={classnames([{ isDragging }])}>
        {this.props.children}
      </div>,
    );
  }
}

TableHeadColumnTitleDnDSource.propTypes = {
  id: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.COLUMN_TITLE, columnTitleSource, collectSource)(TableHeadColumnTitleDnDSource);
