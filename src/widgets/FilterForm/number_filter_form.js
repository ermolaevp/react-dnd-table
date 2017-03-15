import React, { Component } from 'react';

class NumberFilterForm extends Component {
  render() {
    const { filter, endpoint, column } = this.props
    const handleOnChange = (e) => {
      let { name, value } = e.currentTarget
      value = value.trim() === '' ? value : parseInt(value, 0)
      const actionFilters = {
        gte: this.props.setGteFilter,
        lte: this.props.setLteFilter,
        equal: this.props.setFilter
      }
      actionFilters[name](endpoint, column.id, value)
    }
    const f = (filter[endpoint] || {})[column.id] || {}
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="dd-menu-item--filter">
          <input
            value={ f.$gte }
            type="number"
            name="gte"
            placeholder=">"
            onChange={handleOnChange}
          />
        </div>
        <div className="dd-menu-item--filter">
          <input
            value={ f.$lte }
            type="number"
            name="lte"
            placeholder="<"
            onChange={handleOnChange}
          />
        </div>
        <div className="separator"/>
        <div className="dd-menu-item--filter">
          <input
            value={ typeof f === 'number' || typeof f === 'string' ? f : '' }
            type="number"
            name="equal"
            placeholder="="
            onChange={handleOnChange}
          />
        </div>
        <button className="hidden">submit</button>
      </form>
    )
  }
}

export default NumberFilterForm;
