import React, { Component } from 'react';
import ActionButtons from './action_buttons'
import { parseFormValues, clearForm, getRangeFilter } from './utils'

class NumberFilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastModified: 'gte'
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.setLastModified = this.setLastModified.bind(this);
  }
  fillForm(filter) {
    if (typeof filter !== 'undefined') {
      if (['string', 'number'].indexOf(typeof filter) !== -1) this.form.equal.value = filter
      if (typeof filter['$gte'] !== 'undefined') this.form.gte.value = filter['$gte']
      if (typeof filter['$lte'] !== 'undefined') this.form.lte.value = filter['$lte']
    }
  }
  componentDidMount() {
    this.fillForm(this.props.filter)
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)) {
      this.fillForm(nextProps.filter)
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const { lastModified } = this.state;
    const values = parseFormValues(this.form, val => parseInt(val.trim(), 10));
    if ('equal' === lastModified
      && 'undefined' !== typeof values.equal
      && !isNaN(values.equal))
    {
      return this.props.onSubmit(values.equal);
    }
    if ('lte' === lastModified || 'gte' === lastModified) {
      const filter = getRangeFilter(values.gte, values.lte);
      if (filter) {
        return this.props.onSubmit(filter);
      }
    }
    return false;
  }
  onReset() {
    clearForm(this.form)
    this.props.onReset()
  }
  setLastModified(lastModified) {
    if (lastModified === 'equal') {
      this.form.gte.value = this.form.lte.value = ''
    } else {
      this.form.equal.value = ''
    }
    this.setState({ lastModified })
  }
  render() {
    return (
      <form
        ref={node => this.form = node}
        onSubmit={this.onSubmit}
      >
        <div className="dd-menu-item--filter"><input type="number" name="gte" placeholder=">" onChange={() => this.setLastModified('gte')} /></div>
        <div className="dd-menu-item--filter"><input type="number" name="lte" placeholder="<" onChange={() => this.setLastModified('lte')} /></div>
        <div className="separator"/>
        <div className="dd-menu-item--filter"><input type="number" name="equal" placeholder="=" onChange={() => this.setLastModified('equal')} /></div>
        <ActionButtons onSubmit={this.onSubmit} onReset={this.onReset} />
      </form>
    )
  }
}

export default NumberFilterForm;
