import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configRoutes from '../routes';


const propTypes = {
  routerHistory: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};


/**
 * The Provider component makes the Redux store available to the connect()
 * calls in the hierarchy. We can't use connect() without wrapping the root
 * component in the Provider component
*/
const Root = ({ routerHistory, store }) => {
  return (
    <Provider store={store}>
      <Router history={routerHistory}>
        {configRoutes(store)}
      </Router>
    </Provider>
  );
};


Root.propTypes = propTypes;
export default Root;
