import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Home from "./App";
import Game from "./components/game/Game";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}>
                    </Route>
                    <Route exact path="/game" component={Game}>
                    </Route>
                </Switch>
            </Router>
        )
    }
}