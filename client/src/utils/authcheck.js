// used to update the auth state via the useEffect() hook
// also retrieves user profile data saves to global state
// rendered when a user logs in or out
import React, { useEffect, useContext } from "react";
import history from "./history";
import Context from "./context";
import * as ACTIONS from "../store/actions/actions";

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      context.handleUserLogin();
      context.handleUserAddProfile(context.authObj.userProfile);
      history.replace("/");
    } else {
      context.handleUserLogout();
      context.handleUserRemoveProfile();
      history.replace("/");
    }
  }, []);

  // could do a loading screen rather than empty div,
  // but we're just updating state and don't need to alter UI
  return <div></div>;
};

export default AuthCheck;
