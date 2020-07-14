import { combineReducers } from "redux";
import runsReducer from "./runsReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export default combineReducers({
  // runs: runsReducer,
  // user: userReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
