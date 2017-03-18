import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import contactMessage from './contactMessage';
import presidents from './presidents';


export default combineReducers({
  // This reducer must be added if we want the syncing to work with the store!
  routing: routerReducer,
  contactMessage: contactMessage,
  presidents: presidents
});
