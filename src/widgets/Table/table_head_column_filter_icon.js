import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
const { _t } = tiasUtils

export default class TableHeadColumnFilterIcon extends Component {
  render() {
    const {
      handleClick,
      endpoint,
      column
    } = this.props
    return(
      <i
        className="material-icons filter-icon"
        title={_t("Show filter")}
        onClick={e => {
          const clientWidth = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth
          const mostRightX = clientWidth - 320
          const { left: tablePositionX } = findDOMNode(this).getBoundingClientRect()
          let { left: positionX, bottom: positionY } = e.currentTarget.getBoundingClientRect()
          positionX = positionX > mostRightX ? mostRightX : positionX
          positionY = positionY + window.pageYOffset + 3,
          handleClick({
            endpoint,
            column,
            positionX,
            positionY,
          })
          e.stopPropagation()
        }}
      >
        filter_list
      </i>
    )
  }
}
