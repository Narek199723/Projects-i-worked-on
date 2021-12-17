import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user, fireStoreuserObj } = useAuth();

  if (
    fireStoreuserObj &&
    !fireStoreuserObj.approved &&
    rest.path != "/pending-approval" &&
    rest.path != "/welcome"
  ) {
    //return <Redirect to='/pending-approval' />;
    if (
      fireStoreuserObj &&
      !fireStoreuserObj.billingAddress &&
      rest.path != "/payment"
    ) {
      return <Redirect to="/payment" />;
    }
  }

  if (
    fireStoreuserObj &&
    fireStoreuserObj.approved &&
    rest.path == "/pending-approval"
  ) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
