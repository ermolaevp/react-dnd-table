import './fast_filters.css'
import React from 'react'
const { _t, _f } = tiasUtils

const FastFilter = ({ name, payload, removeFilter, ...params }) => {
  const handleClick = (e) => {
    if (params.menusVisibility && params.closeAllMenus) return params.closeAllMenus()
    removeFilter()
    e.stopPropagation()
  }
  return(
    <span
      className="fast-filter"
      title={_t(name)}
      onClick={handleClick}
    >
      <span>
        <i className="material-icons rotate-45">add_circle_outline</i>
      </span>
      <span>
        {(()=>{
          if (typeof payload === 'string') return payload
          if (typeof payload.$regex !== 'undefined') return payload.$regex
          if (typeof payload.$in !== 'undefined') {
            if (name === 'priority') return payload.$in.map(p => _t(p)).join(', ')
            return payload.$in.join(', ')
          }
          if (typeof payload.$gte !== 'undefined' || payload.$lte !== 'undefined') {
            return [_f(payload.$gte), 'x', _f(payload.$lte)]
              .filter(p => typeof p !== 'undefined')
              .join(' < ')
          }
          return JSON.stringify(payload)
        })()}
      </span>
    </span>
  )
}

export default FastFilter
