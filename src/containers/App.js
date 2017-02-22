import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

// Containers
import UsersTable from './UsersTable';

// import reducers from '../modules/reducers';

// const store = applyMiddleware(thunk)(createStore)(reducers);

const AppContainer = () =>
  <div id="app" className="clearfix">
    <UsersTable />
  </div>
;

export default AppContainer;
