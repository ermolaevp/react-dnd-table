import { connect } from 'react-redux';

// Widgets
import Table from '../widgets/Table';
// import TableColumnFilter from '../widgets/TableColumnFilter';

// Actions
import columnsFetch from '../modules/columns/actions/columns_fetch';
import columnsMoveLeft from '../modules/columns/actions/columns_move_left';
import columnsMoveRight from '../modules/columns/actions/columns_move_right';
import columnsSetWidth from '../modules/columns/actions/columns_set_width';
import dataFetch from '../modules/data/actions/data_fetch';
import columnFilterSet from '../modules/column_filter/actions/column_filter_set';
import sortAsc from '../modules/sorts/actions/sort_asc';
import sortDesc from '../modules/sorts/actions/sort_desc';
import sortRemove from '../modules/sorts/actions/sort_remove';

const mapStateToProps = ({ columns, data, sorts, filters, submittedFilters, pagination }) => {
  return {
    submittedFilters,
    filters,
    columns: columns.users,
    sorts,
    data: data.users.data,
    pagination: pagination.users,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchColumns() {
    dispatch(columnsFetch('users'));
  },
  fetchData(params) {
    dispatch(dataFetch('users', params));
  },
  columnFilterSet(payload) {
    dispatch(columnFilterSet(payload));
  },
  moveColumnLeft(source, target) {
    dispatch(columnsMoveLeft('users', source, target));
  },
  moveColumnRight(source, target) {
    dispatch(columnsMoveRight('users', source, target));
  },
  resizeColumn(id, width) {
    dispatch(columnsSetWidth('users', id, width));
  },
  sortAscending(columnId) {
    dispatch(sortAsc(columnId));
  },
  sortDescending(columnId) {
    dispatch(sortDesc(columnId));
  },
  removeSorting(columnId) {
    dispatch(sortRemove(columnId));
  },
  handleRowClick(endpoint, row) {

  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
