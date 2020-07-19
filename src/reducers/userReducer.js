export default (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_NAME_OK":
      return action.payload;
    case "GET_USER_NAME_FAIL":
      return action.err;
    default:
      return state;
  }
};
