import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  // This reducer must be added if we want the store to work!
  routing: routerReducer
});
