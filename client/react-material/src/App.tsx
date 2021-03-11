import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BottomBar from "./components/shared/BottomBar";


function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/category'}>
          Category
        </Route>
        <Route path={"/shopping"}>
          Shopping Cart
        </Route>
        <Route path={'/my'}>
          cart
        </Route>
        <Route path={'/'}>
          I am home
        </Route>
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;
