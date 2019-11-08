import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useParams } from 'react-router';
import ReduxContext from './store/ReduxContext';
import configureStore from './store/configureStore';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FormLoader from './components/Form/FormLoader';

const store = configureStore();

const Loading = () => (<div>Loading...</div>);

const SPA = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <ReduxContext store={store}>
        <Header />
        <Navigation />
        <Switch>
          <Route exact path={['/', '/home', '/home/index']} render={(routeProps) => (<div>HOME FILE GOES HERE</div>)} />
          <Route exact path="/search-criteria" render={(routeProps) => (<FormLoader />)} />
        </Switch>
      </ReduxContext>
    </Suspense>
  </Router>
);

export default SPA;

// <Route exact path="other-pages" render={(routeProps) => (<div>other-pages EXAMPLE PAGE</div>)} />
