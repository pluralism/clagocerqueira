import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import contactMessage from './contactMessage';


export default combineReducers({
  // This reducer must be added if we want the syncing to work with the store!
  routing: routerReducer,
  contactMessage: contactMessage
});
