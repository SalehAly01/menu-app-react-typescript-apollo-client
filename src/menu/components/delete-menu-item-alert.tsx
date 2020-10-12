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
  GET_MENU_ITEMS,
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

const DeleteAlert: React.FC<DeleteAlertProps> = (props) => {
  const { isOpen, setOpen, toBeDeletedId } = props;
  const classes = useStyles();

  const [handleRemoveMenuItem, removedMenuItem] = useMutation(
    REMOVE_MENU_ITEM,
    {
      update(cache, { data: { removeMenuItem } }) {
        const menuItemsData = cache.readQuery<MenuItemListData>({
          query: GET_MENU_ITEMS,
        });

        if (menuItemsData?.menuItems) {
          cache.writeQuery({
            query: GET_MENU_ITEMS,
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

  const closeModal = () => setOpen(false);

  const handleDelete = () => {
    handleRemoveMenuItem({
      variables: { id: toBeDeletedId },
    }).then(closeModal);
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
        {removedMenuItem.loading ? (
          <div className={classes.spinnerWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Button onClick={closeModal} variant="contained">
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
