import { combineReducers } from 'redux'

import users from './users/reducers/users'

const reducers = combineReducers({
  users,
});

export default reducers;
