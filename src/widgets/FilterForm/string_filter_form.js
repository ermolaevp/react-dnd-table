import React, { Component, PropTypes } from 'react';

class StringFilterForm extends Component {
  render() {
    const { setFilter, onSubmit, filter = '', column = {} } = this.props;
    const handleOnChange = e => setFilter(column.id, e.currentTarget.value.trim());
    if (this.form) this.form.input_value.focus();
    return (
      <form ref={node => this.form = node} onSubmit={onSubmit}>
        <div className="FilterForm-StringField">
          <input
            name="input_value"
            autoFocus
            value={filter}
            placeholder="Search"
            onChange={handleOnChange}
          />
        </div>
        <input type="submit" className="hidden" />
      </form>
    )
  }
}

export default StringFilterForm;
