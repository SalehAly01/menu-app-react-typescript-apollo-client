import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
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

import { CREATE_MENU_ITEM, GET_MENU_QUERY } from './menu-queries-and-mutations';

import { MenuItemListData } from './menu.types';

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

const AddMenuItem = () => {
  const classes = useStyles();
  const history = useHistory();

  const [itemType, setItemType] = useState<ItemType>();
  const [itemName, setItemName] = useState<string>();
  const [itemPrice, setItemPrice] = useState<number>();

  const [createMenuItem, newAddedMenuItem] = useMutation(CREATE_MENU_ITEM, {
    update(cache, { data: { newMenuItem } }) {
      const menuItemsData = cache.readQuery<MenuItemListData>({
        query: GET_MENU_QUERY,
      });

      if (menuItemsData?.menuItems) {
        cache.writeQuery({
          query: GET_MENU_QUERY,
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
              value={itemType}
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
            value={itemName}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setItemName(event.target.value)}
          />
          <TextField
            required
            label="Price"
            value={itemPrice}
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
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
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

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={newAddedMenuItem.loading}
        >
          {newAddedMenuItem.loading ? <CircularProgress /> : 'Save Item'}
        </Button>
      </form>
    </div>
  );
};

export default AddMenuItem;
