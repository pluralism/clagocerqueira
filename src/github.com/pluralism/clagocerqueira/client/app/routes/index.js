import { IndexRedirect, Route, Redirect, IndexRoute } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import HomeIndexView from '../views/home';
import PresidentesView from '../views/orgaos_autarquicos/presidentes';


export default function configRoutes(store) {
  return (
    <Route>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomeIndexView} />
        <Route path="/presidentes" component={PresidentesView} />
      </Route>
    </Route>
  );
}
