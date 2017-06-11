import React from 'react';
import ReactRouter from 'react-router';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Main from './Main';
import Home from './Home';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
    	<IndexRoute component={Home} />
    	<Route path='*' component={Home} />
    </Route>
  </Router>
);

export default routes;

