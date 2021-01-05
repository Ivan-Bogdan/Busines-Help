import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
<<<<<<< HEAD
import MyServ from './components/MyServices'
import UpdateTask from "./components/tasks/UpdateTask";
import Test from "./Test";
=======
import SignUp from "./components/SingUp";
import SignIn from "./components/SignIn";
import MyServices from './components/MyServices'
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
<<<<<<< HEAD
          <Route path="/myservices" exact component={MyServ} />
          <Route path="/myservices/updatetask/:id" exact component={UpdateTask} />
          <Route path="/test" exact component={Test} />
=======
          <Route path="/myservices" exact component={MyServices} />
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;