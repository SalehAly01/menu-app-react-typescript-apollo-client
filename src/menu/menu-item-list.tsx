import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import ListItem from 'menu/components/list-item';
import { MenuItemListData } from 'menu/menu.types';

const useStyles = makeStyles({
  menuHeader: { marginBottom: 50 },
  menuWrapper: { padding: '50px 150px' },
  spinnerWrapper: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GET_MENU_QUERY = gql`
  query menuItemList {
    menuItems {
      id: _id
      name
      price
      type
      image
    }
  }
`;

const MenuItemList = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery<MenuItemListData>(GET_MENU_QUERY);

  return (
    <div className={classes.menuWrapper}>
      <Typography variant="h5" className={classes.menuHeader}>
        Menu
      </Typography>

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
            <>
              {data?.menuItems.length ? (
                <Grid container spacing={4} justify="flex-start">
                  {data?.menuItems.map(({ name, price, image, type, id }) => (
                    <ListItem key={id} {...{ id, name, price, image, type }} />
                  ))}
                </Grid>
              ) : (
                <Typography
                  variant="h5"
                  gutterBottom
                  color="error"
                  align="center"
                >
                  Your menu is empty, start adding items!
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MenuItemList;
