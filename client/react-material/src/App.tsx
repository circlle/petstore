import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BottomBar from "./components/shared/BottomBar";
import Home from "./components/Home";
import { useGet } from "restful-react";

function App() {
  const { data, loading } = useGet({
    path: "user/dora",
    requestOptions: {
      method: "get",
      credentials: "omit",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkb3JhIiwiZW1haWwiOiIiLCJleHAiOjE2MjEyMjQyMjQuODk2LCJpYXQiOjE2MTYwNDAyMjR9.XqG-srNMI3GGYOgNc8cmA7Gnl7yqjFBxcl_b-ZsMfAM",
      },
      // body: JSON.stringify({ username: "name1", password: "123456" }),
    },
  });

  console.log(data, loading);

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
