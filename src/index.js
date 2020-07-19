//React imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux imports

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";

//Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import fbConfig from "./config/firebase";
import { getFirebase } from "react-redux-firebase";

//Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxThunk.withExtraArgument(getFirebase))
  )
);

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.querySelector("#root")
);
