import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import classnames from 'classnames'

const columnTitleSource = {
  beginDrag(props) {
    return {
      id: props.id
    }
  },
  endDrag(props, monitor, component) {
    let target = props.id
    const dropResult = monitor.getDropResult()
    if (dropResult !== null) target = dropResult.id
    return {
      source: props.id,
      target
    }
  }
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class TableHeadColumnTitleDnDSource extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }
  render() {
    const { isDragging, connectDragSource } = this.props
    return connectDragSource(
      <span className={classnames([{ isDragging }])}>
        {this.props.children}
      </span>
    )
  }
}

export default DragSource(ItemTypes.COLUMN_TITLE, columnTitleSource, collectSource)(TableHeadColumnTitleDnDSource)
