import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { MenuItem } from './menu.types';

const useStyles = makeStyles({
  itemInfo: { display: 'flex', justifyContent: 'space-between' },
  media: { minHeight: 200, backgroundColor: '#43425D' },
  cardData: { padding: '20px 30px' },
});

const ListItem: React.FC<Omit<MenuItem, '__typename'>> = (props) => {
  const classes = useStyles();
  const { name, price, image, type } = props;

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

            <Typography variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ListItem;
