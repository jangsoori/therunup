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
