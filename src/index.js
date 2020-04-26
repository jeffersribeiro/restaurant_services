import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./routes";
import  'bootstrap/dist/css/bootstrap.min.css' ;

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
