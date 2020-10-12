import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

import {
  GET_MENU_ITEM,
  GET_MENU_ITEMS,
  UPDATE_MENU_ITEM,
} from 'menu/menu-queries-and-mutations';

import MenuItemForm from 'menu/components/menu-item-form';

import { ItemType, MenuItemData, MenuItemListData } from 'menu/menu.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editHeader: { marginBottom: 30 },
    editWrapper: {
      padding: '50px 150px',
      [theme.breakpoints.down('sm')]: { padding: 25 },
    },
    spinnerWrapper: {
      height: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const EditMenuItem = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch<{ id: string }>();
  const itemId = match.params.id;

  const { data, loading } = useQuery<MenuItemData>(GET_MENU_ITEM, {
    variables: { id: itemId },
  });

  const [itemType, setItemType] = useState<ItemType>();
  const [itemName, setItemName] = useState<string>();
  const [itemPrice, setItemPrice] = useState<number>();

  useEffect(() => {
    if (data?.menuItem) {
      setItemName(data.menuItem.name);
      setItemType(ItemType[data.menuItem.type]);
      setItemPrice(data.menuItem.price);
    }
  }, [data]);

  const [handleUpdateMenuItem, updatedMenuItem] = useMutation(
    UPDATE_MENU_ITEM,
    {
      update(cache, { data: { updateMenuItem } }) {
        const menuItemsData = cache.readQuery<MenuItemListData>({
          query: GET_MENU_ITEMS,
        });

        if (menuItemsData?.menuItems) {
          cache.writeQuery({
            query: GET_MENU_ITEMS,
            data: {
              menuItems: [
                ...menuItemsData.menuItems.map((item) => {
                  if (item.id === updateMenuItem.id) {
                    return updateMenuItem;
                  }

                  return item;
                }),
              ],
            },
          });
        }
      },
    }
  );

  const handleSubmit = () => {
    handleUpdateMenuItem({
      variables: {
        id: itemId,
        input: { name: itemName, price: itemPrice },
      },
    }).then(() => history.goBack());
  };

  return (
    <>
      {loading ? (
        <div className={classes.spinnerWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.editWrapper}>
          <Typography variant="h5" className={classes.editHeader}>
            Edit Menu Item
          </Typography>

          <MenuItemForm
            {...{
              handleSubmit,
              isSaving: updatedMenuItem.loading,
              isEditForm: true,
              itemType,
              setItemType,
              itemName,
              setItemName,
              itemPrice,
              setItemPrice,
            }}
          />
        </div>
      )}
    </>
  );
};

export default EditMenuItem;
