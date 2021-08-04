import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { MyServ, MyClients, MyPayments } from "./components";
import UpdateTask from "./components/tasks/UpdateTask";
const Routes = () => {
  return (
    <div className='wrapper'>
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
          <Route path="/mypayments" exact component={MyPayments} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
