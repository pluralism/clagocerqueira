import { IndexRedirect, Route, Redirect, IndexRoute } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import HomeIndexView from '../views/home';
import PresidentesView from '../views/autonomous_bodies/presidents';
import CouncilmenView from '../views/autonomous_bodies/councilmen';


export default function configRoutes(store) {
  return (
    <Route>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomeIndexView} />
        <Route path="/presidentes" component={PresidentesView} />
        <Route path="/vereadores" component={CouncilmenView} />
      </Route>
    </Route>
  );
}
