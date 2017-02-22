import React, { Component } from 'react'

const { _t } = tiasUtils
import ActionButtons from './action_buttons'
import { parseFormValues, clearForm, getRangeFilter } from './utils'

class SubsetFilterForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReset = this.onReset.bind(this)
  }
  onSubmit() {
    const $in = [...this.form.elements]
      .filter((el) => el.nodeName === 'INPUT' && el.checked)
      .map((el) => {
        if (/\d+\.\d+\.\d+\.\d+/.test(el.value)) return el.value
        if (!isNaN(parseInt(el.value, 0))) return parseInt(el.value, 0)
        return el.value
      });

    if ($in.length > 0) {
      return this.props.onSubmit({ $in });
    } else {
      this.onReset()
    }
    return false;
  }
  onReset() {
    const formElements = [...this.form.elements];
    for (let elemIndex in formElements) {
      formElements[elemIndex].checked = true
    }
    this.props.onReset()
  }
  render() {
    // console.log(this.props.filter.$in)
    // checked={this.props.filter.indexOf(item) !== -1}
    const hasFilters = this.props.filter
      && Array.isArray(this.props.filter.$in)
      && this.props.filter.$in.length > 0

    if (this.form) {
      const formElements = this.form.getElementsByTagName('input')
      // console.log(formElements);
      for (const elemIndex in formElements ) if (formElements.hasOwnProperty(elemIndex)) {
        //console.log(formElements[elemIndex]);
        formElements[elemIndex].checked = (!hasFilters || this.props.filter.$in.indexOf(formElements[elemIndex].value) !== -1)
      }
    }

    return (
      <form
        id={`filter_form_${this.props.prefix}`}
        ref={node => this.form = node}
        onSubmit={this.onSubmit}
      >
        {this.props.choices.map((item, index) =>
          <div key={index} className="dd-menu-item">
            <input
              type="checkbox"
              defaultChecked={true}
              name='subset[]'
              value={item}
              id={`subset_${this.props.prefix}_${index}`}
            />
            <label htmlFor={`subset_${this.props.prefix}_${index}`}>{_t(item)}</label>
          </div>
        )}
        <ActionButtons onSubmit={this.onSubmit} onReset={this.onReset} />
      </form>
    )
  }
}

export default SubsetFilterForm;
