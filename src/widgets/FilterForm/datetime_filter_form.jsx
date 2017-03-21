import React, { PropTypes, Component } from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';

// Widgets
import DateTimeSelector from './datetime_selector';
import DatetimeField from './datetime_field';

class DatetimeFilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      currentActive: 'after',
    };
    this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setTime = this.setTime.bind(this);
  }
  setDate(date, { disabled, selected }) {
    if (disabled) return false;
    // let d = moment(date)
    // for (const unit of ['Hours', 'Minutes', 'Seconds']) {
    //   d = d[unit.toLowerCase()](this.state.date['get'+unit]())
    // }
    this.setState({ date });
    this.handleDatetimeChange(date);
  }
  setTime(varName, value, unit) {
    const date = moment(this.state.date)[unit](value).toDate();
    this.setState({ date });
    this.handleDatetimeChange(date);
  }
  handleClick(e) {
    let date = new Date(e.currentTarget.value);
    if (date.toString() === 'Invalid Date') date = new Date();
    this.setState({
      currentActive: e.currentTarget.name,
      date,
    });
  }
  handleDatetimeChange(value) {
    const { column } = this.props;
    const actionFilters = {
      after: this.props.setFilterGte,
      before: this.props.setFilterLte,
      on: this.props.setFilter,
    };
    actionFilters[this.state.currentActive](column.id, value);
  }
  render() {
    const { onSubmit, filter } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <DatetimeField
          value={(typeof filter === 'object' && filter.gte) || ''}
          handleClick={this.handleClick}
          handleOnChange={e => this.handleDatetimeChange(e.currentTarget.value)}
          name="after"
        />
        <DatetimeField
          value={(typeof filter === 'object' && filter.lte) || ''}
          handleClick={this.handleClick}
          handleOnChange={e => this.handleDatetimeChange(e.currentTarget.value)}
          name="before"
        />
        <div className="separator" />
        <DatetimeField
          value={(typeof filter === 'string' || filter instanceof Date) ? filter : ''}
          handleClick={this.handleClick}
          handleOnChange={e => this.handleDatetimeChange(e.currentTarget.value)}
          name="on"
        />
        <button className="hidden">submit</button>
        <DateTimeSelector
          date={this.state.date}
          setDate={this.setDate}
          setTime={this.setTime}
          varName={this.state.currentActive}
          visible
        />
      </form>
    );
  }
}

DatetimeFilterForm.defaultProps = {
  filter: '',
};

DatetimeFilterForm.propTypes = {
  setFilter: PropTypes.func.isRequired,
  setFilterGte: PropTypes.func.isRequired,
  setFilterLte: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.instanceOf(Date)]),
  column: PropTypes.object.isRequired,
};

export default DatetimeFilterForm;
