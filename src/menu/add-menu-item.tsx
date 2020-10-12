import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

import {
  CREATE_MENU_ITEM,
  GET_MENU_ITEMS,
} from 'menu/menu-queries-and-mutations';

import MenuItemForm from 'menu/components/menu-item-form';

import { ItemType, MenuItemListData } from 'menu/menu.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addHeader: { marginBottom: 30 },
    addWrapper: {
      padding: '50px 150px',
      [theme.breakpoints.down('sm')]: { padding: 25 },
    },
  })
);

const AddMenuItem = () => {
  const classes = useStyles();
  const history = useHistory();

  const [itemType, setItemType] = useState<ItemType>();
  const [itemName, setItemName] = useState<string>();
  const [itemPrice, setItemPrice] = useState<number>();

  const [createMenuItem, newAddedMenuItem] = useMutation(CREATE_MENU_ITEM, {
    update(cache, { data: { newMenuItem } }) {
      const menuItemsData = cache.readQuery<MenuItemListData>({
        query: GET_MENU_ITEMS,
      });

      if (menuItemsData?.menuItems) {
        cache.writeQuery({
          query: GET_MENU_ITEMS,
          data: { menuItems: [...menuItemsData.menuItems, newMenuItem] },
        });
      }
    },
  });

  const handleSubmit = () => {
    createMenuItem({
      variables: {
        input: { name: itemName, price: itemPrice, type: itemType },
      },
    }).then(() => history.goBack());
  };

  return (
    <div className={classes.addWrapper}>
      <Typography variant="h5" className={classes.addHeader}>
        Add Menu Item
      </Typography>

      <MenuItemForm
        {...{
          handleSubmit,
          isSaving: newAddedMenuItem.loading,
          itemType,
          setItemType,
          itemName,
          setItemName,
          itemPrice,
          setItemPrice,
        }}
      />
    </div>
  );
};

export default AddMenuItem;
