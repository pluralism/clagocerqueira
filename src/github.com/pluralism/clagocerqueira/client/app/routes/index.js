import { IndexRedirect, Route, Redirect, IndexRoute } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import HomeIndexView from '../views/home';


export default function configRoutes(store) {
  return (
    <Route>
      <Route component={MainLayout}>
        <Route path="/" component={HomeIndexView} />
      </Route>
    </Route>
  );
}
