import "./App.css";
import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import SignIn from "./components/SignIn"
import Homepage from "./components/Homepage"

function App() {
  

  return (
    <div className="App">
      <main>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={SignIn} />
        </Switch>
      </main>
  </div>
  );
}

export default App;
