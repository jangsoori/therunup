import firebase from "firebase/app";
import history from "../history";

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
    history.push("/");
  };
};
