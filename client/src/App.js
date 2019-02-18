import React, { Component } from "react";
import { withRouter, Route, NavLink, Switch, Redirect } from "react-router-dom";
import "./App.css";
import CustomersList from "./CustomersList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{ padding: "0.25em" }}>Web Service</h1>
        <Switch>
          <Route exact path="/" component={CustomersList} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
