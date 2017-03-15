import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import classnames from 'classnames';

// Widgets
import FilterForm from '../widgets/FilterForm';

// Actions
import columnFilterSet from '../modules/column_filter/actions/column_filter_set';
import filterSet from '../modules/filters/actions/filter_set';
import filterSetGte from '../modules/filters/actions/filter_set_gte';
import filterSetLte from '../modules/filters/actions/filter_set_lte';
import filterRemove from '../modules/filters/actions/filter_remove';
import submitFilter from '../modules/submitted_filters/actions/submit_filter';
import unsubmitFilter from '../modules/submitted_filters/actions/unsubmit_filter';

const mapStateToProps = ({ columns, filters, columnFilter }) => {
  const column = columns.users.filter(col => col.id === columnFilter.columnId)[0] || {};
  const filter = filters[columnFilter.columnId];
  return {
    ...columnFilter,
    column,
    filter,
  };
};

const mapDispatchToProps = dispatch => ({
  setFilter(columnId, payload) {
    dispatch(filterSet(columnId, payload));
  },
  setFilterGte(columnId, payload) {
    dispatch(filterSetGte(columnId, payload));
  },
  setFilterLte(columnId, payload) {
    dispatch(filterSetLte(columnId, payload));
  },
  closeColumnFilter() {
    dispatch(columnFilterSet({ isVisible: false }));
  },
  onSubmit(columnId, payload) {
    dispatch(submitFilter(columnId, payload));
  },
  onReset(columnId) {
    dispatch(filterRemove(columnId));
    dispatch(unsubmitFilter(columnId));
  },
});

class ColumnFilter extends Component {
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
  closeFilterForm(e) {
    this.props.isVisible && this.props.closeColumnFilter();
  }
  render() {
    return (
      <FilterForm {...this.props} />
    );
  }
}

// ColumnFilter.propTypes = {
//   isVisible: PropTypes.bool.isRequired,
//   positionX: PropTypes.number.isRequired,
//   positionY: PropTypes.number.isRequired,
//   // filter: undefined || object || string || number,
//   choices: PropTypes.array.isRequired,
//   filterType: PropTypes.string,
//   endpoint: PropTypes.string,
//   column: PropTypes.string,
//   setFilter: PropTypes.func.isRequired,
//   resetFilter: PropTypes.func.isRequired,
//   closeTfc: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(ColumnFilter);
