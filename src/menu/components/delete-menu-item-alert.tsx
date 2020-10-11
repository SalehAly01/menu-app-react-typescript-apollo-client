import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  CircularProgress,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';

import {
  GET_MENU_QUERY,
  REMOVE_MENU_ITEM,
} from 'menu/menu-queries-and-mutations';

import { MenuItemListData } from 'menu/menu.types';

const useStyles = makeStyles(() =>
  createStyles({
    dialogTitle: { textTransform: 'capitalize' },
    dialogActions: { padding: '8px 16px 16px' },
    spinnerWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

interface DeleteAlertProps {
  isOpen: boolean;
  setOpen: (newState: boolean) => void;
  toBeDeletedId: string;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  isOpen,
  setOpen,
  toBeDeletedId,
}) => {
  const classes = useStyles();

  const [handleRemoveMenuItem, removedAddedMenuItem] = useMutation(
    REMOVE_MENU_ITEM,
    {
      update(cache, { data: { removeMenuItem } }) {
        const menuItemsData = cache.readQuery<MenuItemListData>({
          query: GET_MENU_QUERY,
        });

        if (menuItemsData?.menuItems) {
          cache.writeQuery({
            query: GET_MENU_QUERY,
            data: {
              menuItems: [
                ...menuItemsData.menuItems.filter(
                  (item) => item.id !== removeMenuItem.id
                ),
              ],
            },
          });
        }
      },
    }
  );

  const handleDelete = () => {
    handleRemoveMenuItem({
      variables: { id: toBeDeletedId },
    }).then(() => {
      setOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} aria-labelledby="delete-alert">
      <DialogTitle className={classes.dialogTitle}>
        Delete menu Item
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you would like to delete this menu item?
        </DialogContentText>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        {removedAddedMenuItem.loading ? (
          <div className={classes.spinnerWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Button onClick={() => setOpen(false)} variant="contained">
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;
