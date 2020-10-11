import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import {
  AppBar,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

import Menu from 'menu';

import './App.css';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#F0F0F7',
      height: '100%',
    },
    appBar: { backgroundColor: '#fff' },
    title: {
      color: '#43425D',
      textDecoration: 'none',
      textTransform: 'uppercase',
    },
  })
);

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Cafe React
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>
        <Redirect from="/" exact to="/menu" />

        <Route exact path="/menu" component={Menu} />
      </Switch>
    </div>
  );
};

export default App;
