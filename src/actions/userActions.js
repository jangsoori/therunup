import firebase from "firebase/app";

export const getUserName = (id) => {
  return (dispatch, getState, getFirebase) => {
    getFirebase()
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((res) => {
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
