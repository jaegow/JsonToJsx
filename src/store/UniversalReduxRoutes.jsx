import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ReduxContext from './ReduxContext';

const UniversalReduxRoutes = ({ store, routes }) => (
  <ReduxContext store={store}>
    <Switch>
      {
        routes.map((route) => {
          return (<Route key={route.path} exact path={route.path} component={route.component} />);
        })
      }
    </Switch>
  </ReduxContext>
);

UniversalReduxRoutes.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
};

export default UniversalReduxRoutes;
