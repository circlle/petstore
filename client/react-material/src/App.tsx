import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BottomBar from "./components/shared/BottomBar";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/category"}>Category</Route>
        <Route path={"/shopping"}>Shopping Cart</Route>
        <Route path={"/my"}>cart</Route>
        <Route path={"/"}>
          <Home />
        </Route>
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;
