export default (state = { authError: {} }, action) => {
  switch (action.type) {
    case "SIGNUP_OK":
      console.log("sign up ok");

      return state;
    case "SIGNUP_FAIL":
      console.log("sign up fail");

      return { ...state, authError: action.payload };
    case "LOGIN_FAIL":
      return { ...state, authError: action.payload };
    case "LOGIN_OK":
      console.log("login ok");

      return state;
    case "LOGOUT_OK":
      console.log("logout ok");

      return state;

    default:
      return state;
  }
};
