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
  handleOnSubmit(columnId, payload) {
    dispatch(submitFilter(columnId, payload));
    dispatch(columnFilterSet({ isVisible: false }));
  },
  handleOnReset(columnId) {
    dispatch(filterRemove(columnId));
    dispatch(unsubmitFilter(columnId));
    dispatch(columnFilterSet({ isVisible: false }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
