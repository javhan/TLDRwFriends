import "./App.css";
import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Homepage from "./components/Homepage"
import Register from "./components/Register"

function App() {
  


  return (
    <div className="App">
      <main>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </main>
  </div>
  );
}

export default App;
