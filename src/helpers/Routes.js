import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (burrito) => (user
    ? (<Component {...burrito} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: burrito.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  students: PropTypes.array.isRequired,
  setStudents: PropTypes.func.isRequired,
  user: PropTypes.any
};
