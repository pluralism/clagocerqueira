import { Route, IndexRoute } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import HomeIndexView from '../views/home';
import PresidentsView from '../views/autonomous_bodies/presidents';
import CouncilmenView from '../views/autonomous_bodies/councilmen';
import ParishesPresidentsView from '../views/autonomous_bodies/parishes_presidents';
import CityCouncilView from '../views/autonomous_bodies/city_council';
import PersonalitiesView from '../views/personalities/index';
import AuthorsView from '../views/authors/index';
import AssociationsView from '../views/associations/index';
import PressView from '../views/press/index';
import FestivitiesView from '../views/festivities/index';
import StatutesView from '../views/misc/statutes';
import LagoCerqueiraView from '../views/misc/lago_cerqueira';
import SocialEntitiesView from '../views/misc/social_entities';
import NatureView from '../views/nature/index';




export default function configRoutes(store) {
  return (
    <Route>
      <Route path="/pt/" component={MainLayout}>
        <IndexRoute component={HomeIndexView} />
        <Route path="presidentes(/:type)" component={PresidentsView} />
        <Route path="vereadores(/:type)" component={CouncilmenView} />
        <Route path="presientes_junta" component={ParishesPresidentsView} />
        <Route path="assembleia" component={CityCouncilView} />
        <Route path="personalidades" component={PersonalitiesView} />
        <Route path="autores(/:type)" component={AuthorsView} />
        <Route path="associacoes(/:type)" component={AssociationsView} />
        <Route path="comunicacao_social(/:type)" component={PressView} />
        <Route path="festividades(/:type)" component={FestivitiesView} />


        <Route path="estatutos" component={StatutesView} />
        <Route path="lago_cerqueira" component={LagoCerqueiraView} />
        <Route path="orgaos_sociais" component={SocialEntitiesView} />
        <Route path="natureza(/:type)" component={NatureView} />
      </Route>
    </Route>
  );
}
