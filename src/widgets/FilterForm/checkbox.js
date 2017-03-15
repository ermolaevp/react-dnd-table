import React, { Component, PropTypes } from 'react'

export default class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    handleCheckboxChange: PropTypes.func.isRequired,
  }
  render() {
    const { label, id, isChecked, handleCheckboxChange } = this.props
    return (
      <div className="dd-menu-item">
        <input
          id={id}
          type="checkbox"
          name='subset[]'
          value={label}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
}
