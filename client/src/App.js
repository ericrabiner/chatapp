import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <div id="root-container">
        <Router>
          <Switch>
            <AuthRoute exact path="/" component={Chat} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <AuthRoute exact path="/settings" component={Settings} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
