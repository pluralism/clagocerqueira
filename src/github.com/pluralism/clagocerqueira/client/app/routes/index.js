import { Route, IndexRoute } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import HomeIndexView from '../views/home';
import PresidentsView from '../views/autonomous_bodies/presidents';
import CouncilmenView from '../views/autonomous_bodies/councilmen';
import PersonalitiesView from '../views/personalities/index';
import AuthorsView from '../views/authors/index';
import AssociationsView from '../views/associations/index';
import PressView from '../views/press/index';
import FestivitiesView from '../views/festivities/index';
import StatutesView from '../views/misc/statutes';



export default function configRoutes(store) {
  return (
    <Route>
      <Route path="/pt/" component={MainLayout}>
        <IndexRoute component={HomeIndexView} />
        <Route path="presidentes(/:type)" component={PresidentsView} />
        <Route path="vereadores(/:type)" component={CouncilmenView} />
        <Route path="personalidades" component={PersonalitiesView} />
        <Route path="autores(/:type)" component={AuthorsView} />
        <Route path="associacoes(/:type)" component={AssociationsView} />
        <Route path="imprensa(/:type)" component={PressView} />
        <Route path="festividades(/:type)" component={FestivitiesView} />
        <Route path="estatutos" component={StatutesView} />
      </Route>
    </Route>
  );
}
