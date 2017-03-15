import { combineReducers } from 'redux';

import submittedFilters from './submitted_filters/reducers/submitted_filters';
import columnFilter from './column_filter/reducers/column_filter';
import pagination from './pagination/reducers/pagination';
import columns from './columns/reducers/columns';
import filters from './filters/reducers/filters';
import sorts from './sorts/reducers/sorts';
import data from './data/reducers/data';

const reducers = combineReducers({
  submittedFilters,
  columnFilter,
  pagination,
  columns,
  filters,
  sorts,
  data,
});

export default reducers;
