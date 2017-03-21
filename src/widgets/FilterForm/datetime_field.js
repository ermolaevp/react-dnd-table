import React, { PropTypes } from 'react';
import moment from 'moment';

const DatetimeField = ({
  name,
  value,
  handleClick,
  handleOnChange,
}) => {
  const val = (() => {
    if (!value) return '';
    return moment(new Date(value)).format('YYYY/MM/DD HH:mm:ss');
  })();
  return (
    <div className="FilterForm-DatetimeField">
      <input
        type="datetime"
        name={name}
        placeholder={name}
        value={val}
        onClick={handleClick}
        onChange={handleOnChange}
      />
    </div>
  );
};

DatetimeField.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

export default DatetimeField;
