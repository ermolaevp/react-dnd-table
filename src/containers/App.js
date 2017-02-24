import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Containers
import UsersTable from './UsersTable';

import reducers from '../modules/reducers';

const store = applyMiddleware(thunk)(createStore)(reducers);

const AppContainer = () =>
  <Provider store={store}>
    <div id="app" className="clearfix">
      <UsersTable />
    </div>
  </Provider>
;

export default AppContainer;
