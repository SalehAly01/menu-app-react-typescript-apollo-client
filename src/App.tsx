import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Menu from 'menu';

import './App.css';

const App = () => {
  return (
    <Switch>
      <Redirect from="/" exact to="/menu" />

      <Route exact path="/menu" component={Menu} />
    </Switch>
  );
};

export default App;
