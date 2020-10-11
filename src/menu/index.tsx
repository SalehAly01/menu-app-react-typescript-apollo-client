import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';

import MenuItemList from 'menu/menu-item-list';
import AddMenuItem from 'menu/add-menu-item';

const Menu = () => {
  const match = useRouteMatch();
  const baseURL = match.url.replace(/\/$/g, '');

  return (
    <Switch>
      <Redirect from={baseURL} exact to={`${baseURL}/list`} />

      <Route exact path={`${baseURL}/list`} component={MenuItemList} />
      <Route exact path={`${baseURL}/new-item`} component={AddMenuItem} />
    </Switch>
  );
};

export default Menu;
