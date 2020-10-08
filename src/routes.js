import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./components/SingUp";
import SignIn from "./components/SignIn";
import MyServices from './components/MyServices'
const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/myservices" exact component={MyServices} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;