import React from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import { ItemType } from 'menu/menu.types';

const useStyles = makeStyles({
  formWarpper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    marginBottom: 30,
  },
});

interface MenuItemProps {
  handleSubmit: () => void;
  isSaving: boolean;
  isEditForm?: boolean;
  itemType?: ItemType;
  setItemType: React.Dispatch<React.SetStateAction<ItemType | undefined>>;
  itemName?: string;
  setItemName: React.Dispatch<React.SetStateAction<string | undefined>>;
  itemPrice?: number;
  setItemPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const MenuItemForm: React.FC<MenuItemProps> = (props) => {
  const {
    handleSubmit,
    isSaving,
    isEditForm,
    itemType,
    setItemType,
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
  } = props;
  const classes = useStyles();

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className={classes.formWarpper}>
        <FormControl required margin="dense">
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
            disabled={!!isEditForm}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setItemType(event.target.value as ItemType);
            }}
          >
            <MenuItem value={ItemType.MAIN_COURSE}>Main Course</MenuItem>
            <MenuItem value={ItemType.SIDE}>Side</MenuItem>
          </Select>
        </FormControl>

        <FormControl margin="dense">
          <TextField
            required
            label="Name"
            value={itemName || ''}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setItemName(event.target.value)}
          />
        </FormControl>

        <FormControl margin="dense">
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
        </FormControl>
      </div>

      {isSaving ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSaving}
        >
          {isEditForm ? 'Save Updates' : 'Save Item'}
        </Button>
      )}
    </form>
  );
};

export default MenuItemForm;
