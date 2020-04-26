import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/main";
import SignIn from "./pages/signin";
import SignUp from './pages/signup'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/signup" component={SignUp} />
        <Route path="/main" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
