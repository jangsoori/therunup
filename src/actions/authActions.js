import firebase from "firebase/app";
import history from "../history";
import { getUserName } from "./userActions";
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

export const changePassword = (oldPassword, newPassword) => {
  const user = firebase.auth().currentUser;

  const reauthenticate = (currentPassword) => {
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateAndRetrieveDataWithCredential(cred);
  };
  return (dispatch) => {
    reauthenticate(oldPassword)
      .then(() => {
        user.updatePassword(newPassword);
      })
      .then(() => {
        dispatch({
          type: "CHANGE_PASSWORD_OK",
        });
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_PASSWORD_FAIL",
          err,
        });
      });
  };
};

export const changeName = (firstName, lastName) => {
  return (dispatch, getState, getFirebase) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: `${firstName} ${lastName}`,
      })
      .then((res) => {
        getFirebase().firestore().collection("users").doc(user.uid).set({
          firstName: firstName,
          lastName: lastName,
        });
      })
      .then(() => {
        getFirebase()
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((res) =>
            dispatch({
              type: "GET_USER_NAME_OK",
              payload: res.data(),
            })
          )
          .catch((err) => {
            dispatch({
              type: "GET_USER_NAME_FAIL",
              err,
            });
          });
      })

      .then((res) => {
        dispatch({
          type: "CHANGE_USERNAME_OK",
        });
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_USERNAME_FAIL",
          err,
        });
      });
  };
};
