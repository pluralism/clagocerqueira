import { IndexRedirect, Route, Redirect, IndexRoute } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import HomeIndexView from '../views/home';
import PresidentesView from '../views/autonomous_bodies/presidents';
import CouncilmenView from '../views/autonomous_bodies/councilmen';
import PersonalitiesView from '../views/personalities/index';
import AuthorsView from '../views/authors/index';
import AssociationsView from '../views/associations/index';



export default function configRoutes(store) {
  return (
    <Route>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomeIndexView} />
        <Route path="/presidentes" component={PresidentesView} />
        <Route path="/vereadores" component={CouncilmenView} />
        <Route path="/personalidades" component={PersonalitiesView} />
        <Route path="/autores" component={AuthorsView} />
        <Route path="/associacoes" component={AssociationsView} />
      </Route>
    </Route>
  );
}
