import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import classnames from 'classnames'

import TableHeadColumnResizable from './table_head_column_resizable'
import TableHeadColumnTitleDnDSource from './table_head_column_title_dnd_source'

const columnTitleTarget = {
  hover(props, monitor, component) {
    const source = monitor.getItem().id;
    const target = props.id;
    if (source === target) return

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left

    component.setState({ sourceOnTheLeft: hoverClientX < hoverMiddleX })
  },
  drop(props, monitor, component) {
    const source = monitor.getItem().id;
    const target = props.id;
    if (source === target) return

    props.moveColumn(props.endpoint, source, target, component.state.sourceOnTheLeft)
  }
}

const collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    mousePosition: monitor.getClientOffset(),
  }
}

class TableHeadColumnTitleDnD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceOnTheLeft: null
    }
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    moveColumn: PropTypes.func.isRequired,
    // added by decorator
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
  }
  render() {
    const {
      id,
      connectDropTarget,
      isOver,
    } = this.props
    return connectDropTarget(
      <div
        className={classnames([
          "column-title-dnd",
          { sourceOnTheLeft: isOver && this.state.sourceOnTheLeft === true,
            sourceOnTheRight: isOver && this.state.sourceOnTheLeft === false }
        ])}
      >
        <TableHeadColumnTitleDnDSource id={id}>
          {this.props.children}
        </TableHeadColumnTitleDnDSource>
      </div>
    )
  }
}

export default DropTarget(ItemTypes.COLUMN_TITLE, columnTitleTarget, collectDrop)(TableHeadColumnTitleDnD);
