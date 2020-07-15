import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Execute from "./components/code/Execute";
import Footer from "./components/footer/Footer";
// TODO: Add more paths
// import { Switch, HashRouter, Route } from "react-router-dom";
// import Error404 from "./components/Error404 ";

function App() {
  return (
    <Provider store={store}>
      <Execute />
      {/* <HashRouter>
        <Switch>
          <Route exact path="/" component={Execute} />
          <Route component={Error404} />
        </Switch>
      </HashRouter> */}
      <Footer />
    </Provider>
  );
}

export default App;
