// Vanilla JS class to hold auth related functions and variable
import auth0 from "auth0-js";
import history from "./history";

export default class Auth {
  // property used to intitialize Auth0 app
  auth0 = new auth0.WebAuth({
    domain: "webapp1.auth0.com",
    clientID: "",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid profile email"
  });

  // empty object to hold user profile data we get from auth0
  userProfile = {};

  // user can login through auth0 widget
  login = () => {
    this.auth0.authorize();
  };

  // saves id & accessToken from auth0 to local storage and sets expiry
  handleAuth = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult) {
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);

        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("expiresAt", expiresAt);

        this.getProfile();
        setTimeout(() => {
          history.replace("/authcheck");
        }, 600);
      } else {
        console.log(err);
      }
    });
  };

  // retrieves accessToken from local storage
  getAccessToken = () => {
    if (localStorage.getItem("access_token")) {
      const accessToken = localStorage.getItem("access_token");
      return accessToken;
    } else {
      return null;
    }
  };

  // parse the access token to extract user profile data
  getProfile = () => {
    let accessToken = this.getAccessToken();
    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = { profile };
        }
      });
    }
  };

  // removes accessTokens and logs out user
  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expiresAt");
    setTimeout(() => {
      history.replace("/authcheck");
    }, 200);
  };

  // checks for expiryTime vs current time
  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
    return new Date().getTime() < expiresAt;
  };
}
