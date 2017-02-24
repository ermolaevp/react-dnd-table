import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import classnames from 'classnames'
import style from './css/column-resizable.css'
import { ItemTypes } from './dnd_constants'

const columnResizerTarget = {
  hover(props, monitor, component) {
    // const {id, endpoint} = monitor.getItem()
    // const headColumn = document.querySelector(`table.table-${endpoint} th.${id}-column`)
    // const width = monitor.getClientOffset().x - headColumn.getBoundingClientRect().left
    //
    // props.resizeColumn(endpoint, id, width)
  },
  drop(props, monitor, component) {
    const componentCoords = findDOMNode(component).getBoundingClientRect()
    const componentWidth = componentCoords.right - componentCoords.left
    const {id, endpoint} = monitor.getItem()

    const headColumn = document.querySelector(`table.table-${endpoint} th.${id}-column`)
    const headColumnCoords = headColumn.getBoundingClientRect()
    const nextHeadColumn = headColumn.nextSibling
    const nextHeadColumnCoords = nextHeadColumn.getBoundingClientRect()

    const nextColumnId = nextHeadColumn.getAttribute('class').replace('-column', '')

    let mousePositionX = monitor.getClientOffset().x

    const minColWidth = 100

    if (mousePositionX > (nextHeadColumnCoords.right - minColWidth)) mousePositionX = nextHeadColumnCoords.right - minColWidth
    if (mousePositionX < (headColumnCoords.left + minColWidth)) mousePositionX = headColumnCoords.left + minColWidth

    const headColumnWidth = mousePositionX - headColumnCoords.left
    const nextHeadColumnWidth = nextHeadColumnCoords.right - mousePositionX
    const width = (headColumnWidth * 100 / componentWidth).toFixed(4) + '%'
    const nextWidth = (nextHeadColumnWidth * 100 / componentWidth).toFixed(4) + '%'
    props.resizeColumn(endpoint, id, width)
    props.resizeColumn(endpoint, nextColumnId, nextWidth)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class TableHeadRowDropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    resizeColumn: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
  }
  render() {
    const { isOver } = this.props
    return this.props.connectDropTarget(
      <tr className={classnames(["column-row-drop-target", { isOver }])}>
        {this.props.children}
      </tr>
    )
  }
}

export default DropTarget(ItemTypes.COLUMN_RESIZER, columnResizerTarget, collect)(TableHeadRowDropTarget)
