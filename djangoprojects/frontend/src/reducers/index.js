import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from 'reducers/auth_reducer';
import dataReducer from 'reducers/data_reducer';

export default combineReducers({
  auth: authReducer,
  data: dataReducer,
  form: formReducer
});
