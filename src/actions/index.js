import firebase from "firebase/app";

export const logIn = (email, password) => {
  return () => {
    console.log("hi");

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => console.log(err));
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
      });
  };
};

export const signOut = () => {
  return () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
};
export const addRun = (run) => {
  return async (dispatch, getState, getFirebase) => {
    await getFirebase()
      .firestore()
      .collection("runs")
      .add({ ...run });
  };
};
