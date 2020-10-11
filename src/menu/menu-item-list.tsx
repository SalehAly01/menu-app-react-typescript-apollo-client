import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import client from 'client';
import { GET_MENU_ITEMS } from 'menu/menu-queries-and-mutations';

import ListItem from 'menu/components/list-item';

import { MenuItemListData } from 'menu/menu.types';

const useStyles = makeStyles({
  menuHeader: {
    marginBottom: 50,
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuWrapper: { maxWidth: 1200, margin: '50px auto', padding: '0 25px' },
});

const MenuItemList = () => {
  const classes = useStyles();
  const menuItemsData = client.readQuery<MenuItemListData>({
    query: GET_MENU_ITEMS,
  });

  const menuHasData = !!menuItemsData?.menuItems.length;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.menuWrapper}>
      <Typography variant="h5" className={classes.menuHeader}>
        Menu{' '}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/menu/new-item"
        >
          Add Menu Item
        </Button>
      </Typography>

      {menuHasData ? (
        <Grid container spacing={isSmall ? 2 : 4} justify="flex-start">
          {menuItemsData?.menuItems.map(({ name, price, image, type, id }) => (
            <ListItem key={id} {...{ id, name, price, image, type }} />
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h5"
          gutterBottom
          color="textSecondary"
          align="center"
        >
          Your menu is empty, start adding items!
        </Typography>
      )}
    </div>
  );
};

export default MenuItemList;
