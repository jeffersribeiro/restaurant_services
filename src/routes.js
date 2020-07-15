import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from "./pages/home";
import Painel from "./pages/painel";
import SignIn from "./pages/singin";
import SignUp from "./pages/singup";
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/singup" exact={true} component={SignUp} />
        <Route path="/singin" exact={true} component={SignIn} />
        <PrivateRoute path="/painel" exact={true} component={Painel} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
