import firebase from "firebase/app";
import history from "../history";

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
          email: newUser.email,
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
  if (newPassword.length <= 6) {
    return (dispatch) => {
      dispatch({
        type: "CHANGE_PASSWORD_FAIL",
        err: { message: "Password too short!" },
      });
    };
  }
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
      .then((res) => {
        dispatch({
          type: "CHANGE_PASSWORD_OK",
          res,
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

export const changeEmail = (email) => {
  const user = firebase.auth().currentUser;
  return (dispatch) => {
    user
      .updateEmail(email)
      .then(() => {
        dispatch({
          type: "CHANGE_EMAIL_OK",
        });
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_EMAIL_FAIL",
          err,
        });
      });
  };
};
