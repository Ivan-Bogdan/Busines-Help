import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import MyClients from "./components/MyClients";
import MyServ from "./components/MyServices";
import UpdateTask from "./components/tasks/UpdateTask";
const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/myservices" exact component={MyServ} />
          <Route
            path="/myservices/updatetask/:id"
            exact
            component={UpdateTask}
          />
          <Route path="/myclients" exact component={MyClients} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
