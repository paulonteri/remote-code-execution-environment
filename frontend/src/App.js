import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, HashRouter, Route } from "react-router-dom";
import "./App.css";
import Execute from "./components/code/Execute";
import Error404 from "./components/Error404 ";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Execute} />
          <Route component={Error404} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
