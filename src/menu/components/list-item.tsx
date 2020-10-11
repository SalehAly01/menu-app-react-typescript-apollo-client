import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import DeleteAlert from 'menu/components/delete-menu-item-alert';

import { MenuItem } from 'menu/menu.types';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  itemInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 15,
  },
  media: { minHeight: 200, backgroundColor: '#43425D' },
  cardData: { padding: '20px 30px' },
  itemNameAndActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const ListItem: React.FC<Omit<MenuItem, '__typename'>> = (props) => {
  const { id, name, price, image, type } = props;

  const classes = useStyles();
  const history = useHistory();

  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title={`${name} image`}
          />

          <CardContent className={classes.cardData}>
            <Typography
              variant="h6"
              component="h3"
              color="textSecondary"
              className={classes.itemInfo}
            >
              {type} <span>{price}$</span>
            </Typography>

            <Typography
              variant="h5"
              component="h2"
              className={classes.itemNameAndActions}
            >
              {name}

              <span>
                <IconButton
                  aria-label="Edit menu item"
                  onClick={() => history.push(`/menu/${id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete menu item"
                  onClick={() => setDeleteAlertOpen(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        setOpen={setDeleteAlertOpen}
        toBeDeletedId={id}
      />
    </Grid>
  );
};

export default ListItem;
