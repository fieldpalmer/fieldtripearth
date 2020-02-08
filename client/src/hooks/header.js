// will contain the links to the components and a login or logout button based on the user authentication state
import React from "react";
import { Link } from "react-router-dom";
import Context from "../utils/context";

const Header = () => {
  const context = useContext(Context);

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/hooksform">Hooks Form</Link>
      <Link to="/hookscontainer">Hooks Container</Link>
      <Link to="/privateroute">Private Route</Link>
      {!context.authState ? (
        <button onClick={() => context.authObj.login()}>Login</button>
      ) : (
        <button onClick={() => context.authObj.logout()}>Logout</button>
      )}
    </div>
  );
};

export default Header;
