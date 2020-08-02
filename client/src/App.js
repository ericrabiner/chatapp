import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <div id="root-container">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <AuthRoute exact path="/settings" component={Settings} />
            <AuthRoute path="*" component={Home} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
