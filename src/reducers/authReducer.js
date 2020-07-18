export default (
  state = {
    authError: {},
    // passwordChange: {},
    // usernameChange: {},
    // emailChange: {},
  },
  action
) => {
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
    case "CHANGE_PASSWORD_OK":
      return { ...state, passwordChange: { type: "success" } };

    case "CHANGE_PASSWORD_FAIL":
      console.log(action.err);
      return { ...state, passwordChange: { ...action.err, type: "fail" } };
    case "CHANGE_USERNAME_OK":
      return { ...state, usernameChange: { type: "success" } };
    case "CHANGE_USERNAME_FAIL":
      return { ...state, usernameChange: { ...action.err, type: "fail" } };
    case "CHANGE_EMAIL_OK":
      return { ...state, emailChange: { type: "success" } };
    case "CHANGE_EMAIL_FAIL":
      console.log(action.err);
      return { ...state, emailChange: action.err };

    default:
      return state;
  }
};
