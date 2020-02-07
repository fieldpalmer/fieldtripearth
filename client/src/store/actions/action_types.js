// holds all the string action types in variables

// plain_reducer.js boilerplate actions
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

// used to update auth state of the user
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// saves and updates profile data from auth0 to global state
export const ADD_PROFILE = "ADD_PROFILE";
export const REMOVE_PROFILE = "REMOVE_PROFILE";

// tracks form changes and submissions for user text input
export const USER_INPUT_CHANGE = "USER_INPUT_CHANGE";
export const USER_INPUT_SUBMIT = "USER_INPUT_SUBMIT";
