import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import history from "../history";
import { getFirebase } from "react-redux-firebase";
export const logIn = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch({ type: "LOGIN_OK", payload: res });
        history.push("/");
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAIL", payload: err });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, getFirebase) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)

      .then((res) => {
        getFirebase().firestore().collection("users").doc(res.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        });

        res.user.updateProfile({
          displayName: `${newUser.firstName} ${newUser.lastName}`,
        });
      })

      .then((res) => {
        dispatch({ type: "SIGNUP_OK", payload: res });
      })
      .then(() => {
        history.push("/dashboard");
      })

      .catch((err) => {
        dispatch({ type: "SIGNUP_FAIL", payload: err });
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(function (res) {
        dispatch({ type: "LOGOUT_OK", payload: res });
      })
      .catch(function (err) {
        dispatch({ type: "LOGOUT_FAIL", payload: err });
      });
  };
};

//Get user info

export const getUserName = (id) => {
  return (dispatch, getState, getFirebase) => {
    getFirebase()
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((res) => {
        dispatch({ type: "GET_USER_NAME", payload: res.data() });
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
export const addRun = (run) => {
  return (dispatch, getState, getFirebase) => {
    getFirebase()
      .firestore()
      .collection("runs")
      .add({ ...run })
      .then((res) => {
        dispatch({ type: "ADD_RUN" });
      });
    history.push("/dashboard");
  };
};

export const editRun = (runId, values) => {
  return (dispatch, getState, getFirebase) => {
    getFirebase()
      .firestore()
      .collection("runs")
      .doc(runId)
      .update({
        ...values,
      })
      .then(() => {
        dispatch({ type: "EDIT_RUN" });
      });
    history.push("/dashboard");
  };
};
export const deleteRun = (runId) => {
  return (dispatch, getState, getFirebase) => {
    getFirebase()
      .firestore()
      .collection("runs")
      .doc(runId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_RUN" });
      });
  };
};
