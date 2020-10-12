import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';

import MenuItemList from 'menu/menu-item-list';
import AddMenuItem from 'menu/add-menu-item';
import EditMenuItem from 'menu/edit-menu-item';

import { GET_MENU_ITEMS } from 'menu/menu-queries-and-mutations';
import { MenuItemListData } from 'menu/menu.types';

const useStyles = makeStyles({
  menuHeader: {
    marginBottom: 50,
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuWrapper: { maxWidth: 1200, margin: '50px auto', padding: '0 25px' },
  spinnerWrapper: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Menu = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const baseURL = match.url.replace(/\/$/g, '');

  const { loading, error } = useQuery<MenuItemListData>(GET_MENU_ITEMS);

  return (
    <>
      {loading ? (
        <div className={classes.spinnerWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {error ? (
            <Typography variant="h5" gutterBottom color="error" align="center">
              Oops something went wrong!
            </Typography>
          ) : (
            <Switch>
              <Redirect from={baseURL} exact to={`${baseURL}/list`} />

              <Route exact path={`${baseURL}/list`} component={MenuItemList} />
              <Route
                exact
                path={`${baseURL}/new-item`}
                component={AddMenuItem}
              />
              <Route path={`${baseURL}/:id`} component={EditMenuItem} />
            </Switch>
          )}
        </>
      )}
    </>
  );
};

export default Menu;
