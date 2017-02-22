import React, { Component } from 'react'
const { _t } = tiasUtils

// Widgets
import ActionButtons from './action_buttons'

export default class BooleanFilterForm extends Component {
  render() {
    const { prefix, onSubmit, onReset } = this.props
    const handleSubmit = (form) => {
      onSubmit(this.form[`${prefix}_bool_form`].value === '1')
    }
    return(
      <form ref={node => this.form = node}>
        <div className="dd-menu-item">
          <input type="radio" name={`${prefix}_bool_form`} id={`${prefix}_bool_form_on`} value={1} />
          &nbsp;
          <label htmlFor={`${prefix}_bool_form_on`}>
            <i className="material-icons">radio_button_checked</i>
            &nbsp;
            {_t('in_homenet')}
          </label>
        </div>
        <div className="dd-menu-item">
          <input type="radio" name={`${prefix}_bool_form`} id={`${prefix}_bool_form_off`} value={0}/>
          &nbsp;
          <label htmlFor={`${prefix}_bool_form_off`}>
            <i className="material-icons">radio_button_unchecked</i>
            &nbsp;
            {_t('out_of_homenet')}
          </label>
        </div>
        <ActionButtons onSubmit={handleSubmit} onReset={onReset} />
      </form>
    )
  }
}
