//React imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux imports

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";

// //Auth imports
// import { Auth0Provider } from "@auth0/auth0-react";

//Main

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk))
);
ReactDOM.render(
  // <Auth0Provider
  //   domain="dev-8ycnwdvl.eu.auth0.com"
  //   clientId="u7JDeEXqAtbgqGg80crDB3XIBTK6ECxS"
  //   redirectUri={window.location.origin}
  // >
  <Provider store={store}>
    <App />
  </Provider>,
  // </Auth0Provider>,
  document.querySelector("#root")
);
