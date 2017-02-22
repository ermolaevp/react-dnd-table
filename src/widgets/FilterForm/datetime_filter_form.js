import "react-day-picker/lib/style.css";
import React, { Component } from 'react';
import DayPicker from "react-day-picker";
import moment from 'moment';

import ActionButtons from './action_buttons'
import { parseFormValues, clearForm, getRangeFilter } from './utils'
const { _t, _f } = tiasUtils

const getAfter = (m) => m.startOf('second').toJSON()
const getBefore = (m) => m.endOf('second').toJSON()

const FilterItem = ({ name, onChange, onClick, onSelectDay, currentActive }) => {
  return (
    <div className="dd-menu-item--filter">
      <input
        type="datetime"
        name={name}
        placeholder={_t(name)}
        onClick={() => onClick(name)}
        onChange={() => onChange(name)}
      />
      <div
        className="calendar-wrapper menu-shadow"
        style={{
          display: currentActive === name ? 'block' : 'none'
        }}
      >
        <DayPicker onDayClick={ (e, day) => onSelectDay(name, day) } />
      </div>
    </div>
  )
}

class DatetimeFilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastModified: 'after',
      currentActive: undefined
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.setLastModified = this.setLastModified.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    console.log('datetime mounted')
  }
  fillForm(filter) {
    if (typeof filter !== 'undefined') {
      if (typeof filter['$gte'] !== 'undefined') this.form.after.value = _f(new Date(filter['$gte']))
      if (typeof filter['$lte'] !== 'undefined') this.form.before.value = _f(new Date(filter['$lte']))
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
    const values = parseFormValues(this.form, val => moment(val.trim(), dateTimeFormat));
    if ('on' === lastModified && values.on.isValid()) {
      const after = getAfter(values.on);
      const before = getBefore(values.on);
      const filter = getRangeFilter(after, before);
      return this.props.onSubmit(filter);
    }
    if ('after' === lastModified || 'before' === lastModified) {
      const filter = getRangeFilter(getAfter(values.after), getBefore(values.before));
      return this.props.onSubmit(filter);
    }
    return false;
  }
  onClick(inputName) {
    this.setState({ currentActive: inputName });
  }
  setLastModified(lastModified) {
    this.setState({ lastModified });
    this.updateForm(lastModified);
  }
  setInputValue(inputName, day) {
    let d = new Date(day);
    switch(inputName){
    case 'after':
      d = moment(d).startOf('day');
      break;
    case 'before':
      d = moment(d).endOf('day');
      break;
    default:
      d = moment(d);
    }
    this.setState({ lastModified: inputName });
    this.form[inputName].value = d.format(dateTimeFormat);
    this.updateForm(inputName);
  }
  updateForm(lastModified) {
    lastModified === 'on'
      ? this.form.after.value = this.form.before.value = ''
      : this.form.on.value = ''
  }
  onReset() {
    clearForm(this.form)
    this.props.onReset()
  }
  render() {
    const props = {
      onChange: this.setLastModified,
      onSelectDay: this.setInputValue,
      onClick: this.onClick,
      currentActive: this.state.currentActive
    }
    return (
      <form
        ref={node => this.form = node}
        onSubmit={this.onSubmit}
      >
        <FilterItem name="after" {...props}/>
        <FilterItem name="before" {...props}/>
        <div className="separator"/>
        <FilterItem name="on" {...props}/>
        <button className="hidden">submit</button>

        <ActionButtons onSubmit={this.onSubmit} onReset={this.onReset} />
      </form>
    )
  }
}

export default DatetimeFilterForm;
