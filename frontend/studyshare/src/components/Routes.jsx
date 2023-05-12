import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LogInContainer from "../containers/LogInContainer";
import GroupsContainer from "../containers/GroupsContainer";
import InventoryContainer from "../containers/InventoryContainer";
import GroupDetailContainer from "../containers/GroupDetailContainer";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login">
          <LogInContainer isSignedUp={true} />
        </Route>
        <Route path="/signup">
          <LogInContainer isSignedUp={false} />
        </Route>
        <Route path="/groups">
          <GroupsContainer />
        </Route>
        <Route path="/group/:id">
          <GroupDetailContainer />
        </Route>
        <Route path="/inventory">
          <InventoryContainer />
        </Route>
        <Route path="*">
          <LogInContainer isSignedUp={false} />
        </Route>
      </Switch>
    );
  }
}
