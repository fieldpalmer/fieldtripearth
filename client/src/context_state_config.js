// business logic for reading and updating state via useReducer and context.js
// here the <Routes /> component is  wrapped in <Context.Provider /> so the ability
// to read and update state is passed down through the `value` prop to all components
import React, { useReducer } from "react";
import Context from "./utils/context";
import * as ACTIONS from "./store/actions/actions";

import * as Reducer1 from "./store/reducers/plain_reducer";
import * as AuthReducer from "./store/reducers/auth_reducer";
import * as FormReducer from "./store/reducers/form_reducer";
import Routes from "./routes";

import Auth from "./utils/auth";

const auth = new Auth();

const ContextState = () => {
  // PLAIN REDUCER
  // #######################
  const { Reducer1, initialState } = Reducer1;
  // useReducer() result is destructured and saved in variables stateReducer1 & dispatchReducer1
  // stateReducer1 accesses state properties definied in `initialState` of `Reducer1`
  const [stateReducer1, dispatchReducer1] = useReducer(Reducer1, initialState);
  // actions passed through dispatch tell reducer how to update state
  const handleDispatchTrue = () => {
    // dispatches success to change stateprop1 & 2 from false to true
    dispatchReducer1(ACTIONS.success());
  };
  const handleDispatchFalse = () => {
    // dispatches failure to change stateprop1 & 2 from true to false
    dispatchReducer1(ACTIONS.failure());
  };

  // AUTH REDUCER
  // #######################
  const { AuthReducer, initialState } = AuthReducer;
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer,
    initialState
  );
  const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.login_success());
  };
  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.login_failure());
  };
  const handleAddProfile = profile => {
    dispatchAuthReducer(ACTIONS.add_profile(profile));
  };
  const handleRemoveProfile = () => {
    dispatchAuthReducer(ACTIONS.remove_profile());
  };

  // FORM REDUCER
  const { FormReducer, initialState } = FormReducer;
  const [stateFormReducer, dispatchFormReducer] = useReducer(
    FormReducer,
    initialState
  );
  const handleFormChange = event => {
    dispatchFormReducer(ACTIONS.user_input_change(event.target.value));
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    // .persist() necessary bc data is coming from a child component
    event.persist();
    dispatchFormReducer(
      ACTIONS.user_input_submit(event.target.useContext.value)
    );
  };

  // HANDLE AUTHENTICATION FROM CALLBACK
  const handleAuthentication = props => {
    if (props.location.hash) {
      auth.handleAuth();
    }
  };

  return (
    <div>
      {/* gets all the function and state values defined in the value prop */}
      <Context.Provider
        value={{
          //Reducer1
          stateProp1: stateReducer1.stateprop1,
          stateProp2: stateReducer1.stateprop2,
          dispatchContextTrue: () => handleDispatchTrue(),
          dispatchContextFalse: () => handleDispatchFalse(),

          //Form Reducer
          useContextChangeState: stateFormReducer.user_textChange,
          useContextSubmitState: stateFormReducer.user_textSubmit,
          useContextSubmit: event => handleFormSubmit(event),
          useContextChange: event => handleFormChange(event),

          //Auth Reducer
          authState: stateAuthReducer.is_authenticated,
          profileState: stateAuthReducer.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: profile => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          //Handle auth
          handleAuth: props => handleAuthentication(props),
          authObj: auth
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
