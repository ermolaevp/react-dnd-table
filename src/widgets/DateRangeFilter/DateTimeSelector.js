import React, { Component, PropTypes } from 'react'
import DayPicker, { DateUtils } from "react-day-picker"
import LocaleUtils from "react-day-picker/moment"
import classnames from 'classnames'
import moment from 'moment'

const getTime = (date, func) => {
  if (date === null) return 0
  return date[func]()
}

const isFutureDay = (d) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today < d;
}

const DateTimeSelector = ({
  date,
  setDate,
  setTime,
  varName,
  visible
}) => {
  const setStartOfDay = (e) => {
    setDate(e, moment(date).startOf('day').toDate(), {})
    return false
  }
  const setEndOfDay = (e) => {
    setDate(e, moment(date).endOf('day').toDate(), {})
    return false
  }
  return (
    <div
      className={classnames([
        'date-range-day-time-picker',
        'menu',
        `date-range-day-time-picker--${varName}`,
        {hidden: !visible}
      ])}
      onClick={e => e.stopPropagation()}
    >
      <div className="arrow-decoration"><i className="material-icons rotate-270">play_arrow</i></div>
      <DayPicker
        localeUtils={ LocaleUtils }
        locale="ru"
        numberOfMonths={ 1 }
        onDayClick={ setDate }
        selectedDays={day => DateUtils.isSameDay(date, day)}
        disabledDays={ isFutureDay }
      />
    <div className="range-selector-current-time">
      <span title='start of day' className="wind-bullet" onClick={setStartOfDay}>&bull;</span>
      &nbsp;
      {moment(date).format('HH:mm:ss')}
      &nbsp;
      <span title='end of day' className="wind-bullet" onClick={setEndOfDay}>&bull;</span>
    </div>
    <div className="range-selector-title">Часы</div>
      <div className="range-selector">
        <span className="range-selector-limit-val">0</span>
        <input
          type="range"
          min={0}
          max={23}
          step={1}
          value={getTime(date, 'getHours')}
          onChange={e => setTime(varName, e.currentTarget.value, 'hour')}
        />
        <span className="range-selector-limit-val">23</span>
      </div>
      <div className="range-selector-title">Минуты</div>
      <div className="range-selector">
        <span className="range-selector-limit-val">0</span>
        <input
          type="range"
          min={0}
          max={59}
          step={1}
          value={getTime(date, 'getMinutes')}
          onChange={e => setTime(varName, e.currentTarget.value, 'minute')}
        />
        <span className="range-selector-limit-val">59</span>
      </div>
      <div className="range-selector-title">Секунды</div>
      <div className="range-selector">

        <span className="range-selector-limit-val">0</span>
        <input
          type="range"
          min={0}
          max={59}
          step={1}
          value={getTime(date, 'getSeconds')}
          onChange={e => setTime(varName, e.currentTarget.value, 'second')}
        />
        <span className="range-selector-limit-val">59</span>
      </div>
    </div>
  )
}

export default DateTimeSelector
