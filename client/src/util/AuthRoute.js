import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";
import Nav from "../components/Nav";

function AuthRoute({ component: Component, ...props }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={(props) =>
        user ? (
          <>
            <Nav />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default AuthRoute;
