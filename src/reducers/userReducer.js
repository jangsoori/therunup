export default (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_NAME_OK":
      console.log("got user naem");
      return action.payload;
    case "GET_USER_NAME_FAIL":
      console.log("CANT GET USERNAME");
      return action.err;
    default:
      return state;
  }
};
