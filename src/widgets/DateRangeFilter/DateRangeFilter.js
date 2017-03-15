import './date-range-filter.css'

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { dateTimeFormat } from '../../constants'
import classnames from 'classnames'

// Widgets
import DateTimeSelector from './DateTimeSelector'

const _f = (v) => moment(v).format(dateTimeFormat)
const _p = (p) => `${Math.floor(p/60)} ч. ${p%60} мин.`
const date_range_by_p = (p) => {
  const _to = new Date
  const _from = moment(_to).subtract(p, 'minutes').toDate()
  return {
    _to,
    _from
  }
}

export default class DateRangeFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _from: new Date, // inital "from" field value
      _to: new Date,   // inital "to" field value
      period: 15,  // time period from now, minutes
      interval: 1, // update frequency, minutes
      isFromVisible: false,
      isToVisible: false,
      isPeriodSelectorVisible: false
    }
    this.setFrom = this.setFrom.bind(this)
    this.setTo = this.setTo.bind(this)
    this.setPeriod = this.setPeriod.bind(this)
    this.setTime = this.setTime.bind(this)
    this.myTimer = this.myTimer.bind(this)
    this.setTimer = this.setTimer.bind(this)
    this.toggleFromVisibility = this.toggleFromVisibility.bind(this)
    this.toggleToVisibility = this.toggleToVisibility.bind(this)
    this.togglePeriodSelector = this.togglePeriodSelector.bind(this)
    this.closeAllPickers = this.closeAllPickers.bind(this)
    this.setMyInterval = this.setMyInterval.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
  }
  componentDidMount() {
    const { dateRange } = this.props
    this.setState({
      _from: dateRange.from,
      _to: dateRange.to,
    })
    this.setTimer(this.state.interval)
    window.addEventListener('click', this.closeAllPickers)
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
    window.removeEventListener('click', this.closeAllPickers)
  }
  myTimer() {
    const date_range = date_range_by_p(this.state.period)
    this.setState({ ...date_range })
  }
  setTimer(minutes_interval) {
    clearInterval(this.timerID)
    this.timerID = setInterval(this.myTimer, minutes_interval * 60000)
  }
  setFrom(e, day, { disabled, selected }) {
    if (disabled) return false
    const _from = moment(day).startOf('day').toDate()
    this.setState({ _from })
  }
  setTo(e, day, { disabled, selected }) {
    if (disabled) return false
    const _to = moment(day).endOf('day').toDate()
    this.setState({ _to })
  }
  setPeriod(e) {
    const period = e.currentTarget.value
    const date_range = date_range_by_p(period)
    this.setState({ period, ...date_range })
  }
  setTime(var_name, value, unit) {
    this.setState({ [var_name]: moment(this.state[var_name])[unit](value).toDate() })
  }
  setMyInterval(e) {
    this.setState({ interval: e.currentTarget.value })
    if (e.currentTarget.value > 0) {
      this.setTimer(e.currentTarget.value)
      this.setState({
        ...date_range_by_p(this.state.period)
      })
    } else {
      clearInterval(this.timerID)
    }
  }
  toggleFromVisibility() {
    clearInterval(this.timerID)
    this.setState({
      isFromVisible: !this.state.isFromVisible,
      isToVisible: false,
      isPeriodSelectorVisible: false,
      interval: 0
    })
  }
  toggleToVisibility() {
    clearInterval(this.timerID)
    this.setState({
      isToVisible: !this.state.isToVisible,
      isFromVisible: false,
      isPeriodSelectorVisible: false,
      interval: 0
    })
  }
  togglePeriodSelector() {
    this.setState({
      isPeriodSelectorVisible: !this.state.isPeriodSelectorVisible,
      isToVisible: false,
      isFromVisible: false,
    })
  }
  closeAllPickers() {
    this.setState({
      isFromVisible: false,
      isToVisible: false,
      isPeriodSelectorVisible: false
    })

    // reset to inital values
    const { dateRange } = this.props
    this.setState({
      _from: dateRange.from,
      _to: dateRange.to,
    })
  }
  applyFilters() {
    this.props.filtersApply({...this.state})
  }
  render() {
    const { setTimeForFrom, getTimeForFrom } = this

    return(
      <div className="date-range-filter">
        <div className="date-range-input-selector">
          <span
            onClick={e => {
              this.toggleFromVisibility()
              e.stopPropagation()
            }}
          >
            {_f(this.state._from)}
          </span>
          <DateTimeSelector
            date={this.state._from}
            setDate={this.setFrom}
            setTime={this.setTime}
            varName='_from'
            visible={this.state.isFromVisible}
          />
        </div>
        <span className="sep">&nbsp;&mdash;&nbsp;</span>
        <div className="date-range-input-selector">
          <span
            onClick={e => {
              this.toggleToVisibility()
              e.stopPropagation()
            }}
          >
            {_f(this.state._to)}
          </span>
          <DateTimeSelector
            date={this.state._to}
            setDate={this.setTo}
            setTime={this.setTime}
            varName='_to'
            visible={this.state.isToVisible}
          />
        </div>
        <div className="date-range-period-interval-wrapper">
          <span
            className="date-range-period-interval-activator"
            onClick={e => {
              this.togglePeriodSelector()
              e.stopPropagation()
            }}
          >
            <span ref={node => this.periodElement = node}>{_p(this.state.period)}</span>
            {' / '}
            {this.state.interval > 0 ? `${this.state.interval} мин.` : 'не обновлять'}
          </span>
          <div
            className={classnames([
              'date-range-period-interval',
              'menu',
              {hidden: !this.state.isPeriodSelectorVisible}
            ])}
            onClick={e => e.stopPropagation()}
          >
              <div className="arrow-decoration"><i className="material-icons rotate-270">play_arrow</i></div>
              <div className="range-selector-title">
                Период: {_p(this.state.period)}
              </div>
              <div className="range-selector">
                <span className="range-selector-limit-val">15 мин.</span>
                <input
                  type="range"
                  min={15}
                  max={1440}
                  step={15}
                  defaultValue={15}
                  onChange={this.setPeriod}
                />
                <span className="range-selector-limit-val">24 ч.</span>
              </div>
              <div className="range-selector-title">
                Интервал обновления: {this.state.interval} мин.{ this.state.interval === '0' ? ' (не обновлять)' : ''}
              </div>
              <div className="range-selector">
                <span className="range-selector-limit-val">0 мин.</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={this.state.interval}
                  onChange={this.setMyInterval}
                />
                <span className="range-selector-limit-val">10 мин.</span>
              </div>
            </div>
        </div>
        <span className="date-range-apply-filters"
          onClick={this.applyFilters}
        >
          <i className="material-icons">play_arrow</i>
        </span>
      </div>
    )
  }
}
