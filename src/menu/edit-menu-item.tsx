import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import {
  GET_MENU_ITEM,
  GET_MENU_ITEMS,
  UPDATE_MENU_ITEM,
} from './menu-queries-and-mutations';

import { MenuItemData, MenuItemListData } from './menu.types';

const useStyles = makeStyles({
  addHeader: {
    marginBottom: 30,
  },
  addWrapper: { padding: '50px 150px' },
  spinnerWrapper: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWarpper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    marginBottom: 30,
  },
});

enum ItemType {
  MAIN_COURSE = 'MAIN_COURSE',
  SIDE = 'SIDE',
}

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

  const [handleUpdateMenuItem, updatedAddedMenuItem] = useMutation(
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
        <div className={classes.addWrapper}>
          <Typography variant="h5" className={classes.addHeader}>
            Edit Menu Item
          </Typography>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.formWarpper}>
              <FormControl required fullWidth>
                <InputLabel id="menu-item-type">Type</InputLabel>
                <Select
                  labelId="menu-item-type"
                  id="menu-item-type-select"
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  }}
                  value={itemType || ''}
                  disabled
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setItemType(event.target.value as ItemType);
                  }}
                >
                  <MenuItem value={ItemType.MAIN_COURSE}>Main Course</MenuItem>
                  <MenuItem value={ItemType.SIDE}>Side</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                label="Name"
                value={itemName || ''}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => setItemName(event.target.value)}
              />
              <TextField
                required
                label="Price"
                value={itemPrice || ''}
                type="number"
                InputProps={{
                  inputProps: { min: 1 },
                }}
                onKeyDown={(event) => {
                  if (event.key === 'e') {
                    event.preventDefault();
                  }
                }}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => {
                  const numericValue = Number(event.target.value);

                  if (numericValue > 0 && event.target) {
                    setItemPrice(numericValue);
                  } else {
                    setItemPrice(undefined);
                  }
                }}
              />
            </div>

            {updatedAddedMenuItem.loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={updatedAddedMenuItem.loading}
              >
                Save Updates
              </Button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default EditMenuItem;
