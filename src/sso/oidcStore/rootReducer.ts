import { combineReducers } from "redux";
import { reducer as oidcReducer } from "redux-oidc";
import { DashboardActionTypes } from "../actionTypes/DashboardActionTypes";

const initialClaimsState = {
  roles: [],
  services: [],
  controllers: [],
  actions: [],
  isUserReady: false,
};

// eslint-disable-next-line default-param-last
const claimsReducer = (state = initialClaimsState, action: any) => {
  switch (action.type) {
    case DashboardActionTypes.UserClaimsSet:
      return {
        ...state,
        roles: action.roles,
        services: action.services,
        controllers: action.controllers,
        actions: action.actions,
      };
    case DashboardActionTypes.UserClaimsClear:
      return initialClaimsState;
    case DashboardActionTypes.UserReady:
      return {
        ...state,
        isUserReady: true,
      };

    case DashboardActionTypes.UserNotReady:
      return {
        ...state,
        isUserReady: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  oidc: oidcReducer,
  claims: claimsReducer,
});

export default rootReducer;
