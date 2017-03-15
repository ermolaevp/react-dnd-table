import './style.css';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import StringFilterForm from './string_filter_form';
import NumberFilterForm from './number_filter_form';
import DatetimeFilterForm from './datetime_filter_form';
import SubsetFilterForm from './subset_filter_form';
import BooleanForm from './boolean_filter_form';

import ActionButtons from './action_buttons';

const FilterForms = {
  string: StringFilterForm,
  number: NumberFilterForm,
  datetime: DatetimeFilterForm,
  subset: SubsetFilterForm,
  bool: BooleanForm,
};

const EmptyFilter = () => <div />;

const FilterForm = (props) => {
  const { positionX, positionY, isVisible, column, onSubmit, onReset, filter } = props;
  const handleOnReset = () => onReset(column.id);
  const handleOnSubmit = () => onSubmit(column.id, filter);
  const FF = (column && column.type && FilterForms[column.type]) || EmptyFilter;
  return (
    <div
      id={column.id}
      className={classnames([
        'filter-form',
        'menu',
      ])}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        zIndex: 1000,
        left: positionX,
        top: positionY,
        display: isVisible ? 'block' : 'none',
      }}
    >
      <FF {...props} />
      <ActionButtons onSubmit={handleOnSubmit} onReset={handleOnReset} />
    </div>
  );
};

export default FilterForm;
