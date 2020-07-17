import firebase from "firebase/app";
import history from "../history";

export const getUserName = (id) => {
  return (dispatch, getState, getFirebase) => {
    getFirebase()
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((res) => {
        console.log(res.data());

        dispatch({ type: "GET_USER_NAME_OK", payload: res.data() });
      })
      .catch((err) => {
        dispatch({ type: "GET_USER_NAME_FAIL", err });
      });
  };
};

//Get user runs

export const getUserRuns = () => {
  return (dispatch, getState, getFirebase) => {
    const user = firebase.auth().currentUser;
    console.log(user.uid);

    getFirebase()
      .firestore()
      .collection("runs")
      .where("userId", "==", user.uid)
      .get()
      .then((res) => {
        // dispatch({ type: "GET_USER_RUNS", payload: res.data() });
        // console.log(res.data);
      });
  };
};
