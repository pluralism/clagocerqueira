import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import contactMessage from './contactMessage';
import generalObjects from './generalObjects';
import personalities from './personalities';
import authors from './authors';
import associations from './associations';
import press from './press';


export default combineReducers({
  // This reducer must be added if we want the syncing to work with the store!
  routing: routerReducer,
  contactMessage: contactMessage,
  generalObjects: generalObjects,
  personalities: personalities,
  authors: authors,
  associations: associations,
  press: press,
});
