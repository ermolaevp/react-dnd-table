import './fast_filters.css'
import React from 'react'
const { _t } = tiasUtils

const FastRemover = ({ removeFilter, ...params }) => {
  const handleClick = (e) => {
    if (params.menusVisibility && params.closeAllMenus) return params.closeAllMenus()
    removeFilter()
    e.stopPropagation()
  }
  return(
    <span
      className="fast-remover"
      title={_t('Remove all')}
      onClick={handleClick}
    >
      <span>
        <i className="material-icons rotate-45">add_circle_outline</i>
      </span>
    </span>
  )
}

export default FastRemover
