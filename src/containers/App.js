import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Containers
import ColumnFilter from './ColumnFilter';
import UsersTable from './UsersTable';
import TablePagination from './TablePagination';

import reducers from '../modules/reducers';

const store = applyMiddleware(thunk)(createStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const AppContainer = () =>
  <Provider store={store}>
    <div id="app" className="clearfix">
      <ColumnFilter />
      <UsersTable />
      <TablePagination />
    </div>
  </Provider>
;

export default AppContainer;
