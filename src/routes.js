import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import MyServ from './components/MyServices'
import UpdateTask from "./components/tasks/UpdateTask";
import Test from "./Test";
const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/myservices" exact component={MyServ} />
          <Route path="/myservices/updatetask/:id" exact component={UpdateTask} />
          <Route path="/test" exact component={Test} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;