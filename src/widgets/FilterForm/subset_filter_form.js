import React, { Component, PropTypes } from 'react'

// Widgets
import Checkbox from './checkbox'

class SubsetFilterForm extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    column: PropTypes.object.isRequired,
    choices: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    hasFilter: PropTypes.bool.isRequired,
    prefix: PropTypes.string.isRequired,
    tioggleSubsetFilter: PropTypes.func.isRequired
  }
  render() {
    const { endpoint, column, choices, filter, hasFilter, prefix, tioggleSubsetFilter } = this.props
    const { $in=[] } = (filter[endpoint] || {})[column.id] || {}
    return (
      <form id={`filter_form_${prefix}`}>
        {choices.map((item, index) =>
          <Checkbox
            key={index}
            id={`subset_${prefix}_${index}`}
            label={item}
            isChecked={$in.indexOf(item) !== -1}
            handleCheckboxChange={() => tioggleSubsetFilter(endpoint, column.id, item)}
          />
        )}
      </form>
    )
  }
}

export default SubsetFilterForm;
