import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Home from "./App";
import Game from "./components/game/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);
export default class Routes extends Component {
  render() {
    return (
      <>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
        {/* <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/game" component={Game}></Route>
        </Switch> */}
      </>
    );
  }
}
