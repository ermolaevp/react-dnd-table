import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

const { _t } = tiasUtils

// Widgets
import TableHeadColumnTitleDnD from './widgets/table_head_column_title_dnd'
import TableHeadColumnFilterIcon from './widgets/table_head_column_filter_icon'
import TableHeadColumnResizable from './widgets/table_head_column_resizable'

// Actions
import tcfSet from '../../modules/table_column_filter/actions/tcf_set'
import tcfShow from '../../modules/table_column_filter/actions/tcf_show'
import tcfToggle from '../../modules/table_column_filter/actions/tcf_toggle'
import attributePlaceBefore from '../../modules/attributes/actions/attribute_place_before'
import attributePlaceAfter from '../../modules/attributes/actions/attribute_place_after'
import sortAscending from '../../modules/endpoints/actions/sort_ascending'
import sortDescending from '../../modules/endpoints/actions/sort_descending'
import sortRemove from '../../modules/endpoints/actions/sort_remove'

const mapStateToProps = ({ endpoints, table_column_filter }, { column, endpoint }) => {
  const { params } = endpoints[endpoint]
  const isSortedAsc = params.sort[column.id] === 1
  const isSortedDesc = params.sort[column.id] === -1
  const isUnsorted = !( isSortedAsc || isSortedDesc )
  const isFiltered = (function(){
    const _f = params.filter[column.id]
    switch (typeof _f) {
    case 'undefined':
      return false
    case 'object':
      if (Array.isArray(_f.$in)) return _f.$in.length > 0
      if (typeof _f.$regex === 'string') return _f.$regex !== ''
      return true
    case 'string':
      return _f !== ''
    case 'number':
      return true
    default:
      return false
    }
  })()
  const isMenuOpened = table_column_filter.isVisible && table_column_filter.endpoint === endpoint && table_column_filter.column.id === column.id
  return {
    column,
    endpoint,
    isSortedAsc,
    isSortedDesc,
    isUnsorted,
    isFiltered,
    isMenuOpened,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class TableHeadColumn extends Component {
  render() {
    const {
      column,
      endpoint,
      isSortedAsc,
      isSortedDesc,
      isUnsorted,
      isFiltered,
      isMenuOpened,
      setTableColumnFilter,
      moveColumn,
      sortAscending,
      sortDescending,
      removeSorting,
    } = this.props

    let style = {}
    if (column.width) style = { ...style, width: column.width }
    const mySort = (e) => {
      if ('pcap' === column.id) return false
      if (isUnsorted)   return sortAscending(endpoint, column.id)
      if (isSortedAsc)  return sortDescending(endpoint, column.id)
      if (isSortedDesc) return removeSorting(endpoint, column.id)
    }
    return (
      <th
        className={classnames([
            `${column.id}-column`,
            {
              filtered: isFiltered,
              sortedAsc: isSortedAsc,
              sortedDesc: isSortedDesc,
              menuOpened: isMenuOpened,
            }])}
        style={style}
      >
        <TableHeadColumnTitleDnD
          id={column.id}
          endpoint={endpoint}
          moveColumn={moveColumn}
        >
          <TableHeadColumnFilterIcon
            handleClick={'pcap' !== column.id ? setTableColumnFilter : function(){return false}}
            endpoint={endpoint}
            column={column}
          />
          <span
            className="column-title"
            title={_t("Sort")}
            onClick={mySort}
            rel={column.id}
          >
            {_t(column.id, endpoint)}
          </span>
          <span className="html-icon sort-asc-icon">&uarr;</span>
          <span className="html-icon sort-desc-icon">&darr;</span>
        </TableHeadColumnTitleDnD>
        <TableHeadColumnResizable id={column.id} endpoint={endpoint}/>
      </th>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHeadColumn)
