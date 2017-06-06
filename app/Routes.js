import React from 'react';
import ReactRouter from 'react-router';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Main from './Main';
import Home from './Home';
// import Profile from './Profile';
// import Article from './Article';
// import Startup from './Startup';
// import ForgotPassword from './ForgotPassword';
// import WalkThrough from './WalkThrough';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
    	<Route path='home' component={Home}  />
    </Route>
  </Router>
);

export default routes;

