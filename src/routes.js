import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from "./pages/main";
import SignIn from "./pages/signin";
import SignUp from './pages/signup';
import Mapbox from './pages/mapbox';
import {isAuthenticated} from './services/auth'

const teste = true
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
        <Route path="/" exact={true} component={SignIn} />
        <Route path="/signup" exact={true} component={SignUp} />
        <PrivateRoute path="/main" exact={true} component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
