import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/main";
import SignIn from "./pages/signin";
import SignUp from './pages/signup';
import Mapbox from './pages/mapbox'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={SignIn} />
        <Route path="/signup" exact={true} component={SignUp} />
        <Route path="/main"  exact={true} component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
