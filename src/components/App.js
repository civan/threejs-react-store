import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Floating from './Floating';
import Header from './Header';
import Home from './Home';

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/floating">
          <Floating />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
