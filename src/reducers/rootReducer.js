import { combineReducers } from "redux";
import login from "./login";
import settings from "./settings";
import twofactorauth from "./twofactorauth";
import forgotpassword from "./forgotpassword";

export default combineReducers({
  login,
  forgotpassword,
  settings,
  twofactorauth,
});
