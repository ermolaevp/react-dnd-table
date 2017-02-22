import './style.css'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import StringFilterForm from './string_filter_form'
import NumberFilterForm from './number_filter_form'
import DatetimeFilterForm from './datetime_filter_form'
import SubsetFilterForm from './subset_filter_form'
import BooleanForm from './boolean_filter_form'

export default class FilterForm extends Component {
  render() {
    const { positionX, positionY, isVisible, filterType, prefix } = this.props
    return (
      <div
        id={prefix}
        className={classnames([
          "filter-form",
          "menu",
          { hidden: !isVisible }
        ])}
        onClick={e => e.stopPropagation() }
        style={{
          left: positionX,
          top: positionY,
        }}
      >
        {(() => {
          switch (filterType) {
            case 'number':   return <NumberFilterForm {...this.props}/>
            case 'datetime': return <DatetimeFilterForm {...this.props}/>
            case 'subset':   return <SubsetFilterForm {...this.props}/>
            case 'bool':     return <BooleanForm {...this.props}/>
            case 'mongo_id':
            case 'string':   return <StringFilterForm {...this.props}/>
            default: return <div></div>
          }
          })()}
      </div>
    )
  }
}
