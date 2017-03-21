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

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.closeFilterForm = this.closeFilterForm.bind(this);
  }
  componentDidMount() {
    window !== undefined && window.addEventListener('click', this.closeFilterForm);
  }
  componentWillUnmount() {
    window !== undefined && window.removeEventListener('click', this.closeFilterForm);
  }
  closeFilterForm() {
    this.props.isVisible && this.props.closeColumnFilter();
  }
  render() {
    const { positionX, positionY, isVisible, column, filter } = this.props;
    const { handleOnSubmit, handleOnReset } = this.props;
    const onReset = () => handleOnReset(column.id);
    const onSubmit = () => handleOnSubmit(column.id, filter);
    const onSubmitForm = (e) => {
      e.preventDefault();
      handleOnSubmit(column.id, filter);
      return false;
    };
    const FF = (column && column.type && FilterForms[column.type]) || EmptyFilter;
    return (
      <div
        id={column.id}
        className="FilterForm"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          zIndex: 1000,
          left: positionX,
          top: positionY,
          display: isVisible ? 'block' : 'none',
        }}
      >
        <FF {...this.props} onSubmit={onSubmitForm} />
        <ActionButtons onSubmit={onSubmit} onReset={onReset} />
      </div>
    );
  }
}

FilterForm.propTypes = {
  positionX: PropTypes.number.isRequired,
  positionY: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  column: PropTypes.object.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  handleOnReset: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  closeColumnFilter: PropTypes.func.isRequired,
};

export default FilterForm;
