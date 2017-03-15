import React, { Component } from 'react'

class DatetimeField extends Component {
  render() {
    return (
      <div className="dd-menu-item--filter">
        <input
          type="datetime"
          name={this.props.name}
          placeholder={this.props.name}
          value={this.props.value}
          onClick={this.props.handleClick}
          onChange={this.props.handleOnChange}
        />
      </div>
    )
  }
}

export default DatetimeField
