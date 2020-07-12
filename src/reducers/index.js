import { combineReducers } from "redux";
import runsReducer from "./runsReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export default combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
