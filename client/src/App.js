import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Vault from "./components/Vault"
import Shortened from "./components/Shortened"

export const LoggedContext = createContext();

function App() {
  const [logState, setLogState] = useState();
  console.log("TESTING APP", JSON.stringify(logState))

  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return;
    }
    let base64Url = accessToken.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    setLogState(JSON.parse(jsonPayload));
  }, []);

  const onOff = { logState, setLogState };

  return (
    <div className="App">
      <LoggedContext.Provider value={onOff}>
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/vault" component={Vault} />
            <Route path="/shortened" component={Shortened} />
          </Switch>
        </main>
      </LoggedContext.Provider>
    </div>
  );
}

export default App;
