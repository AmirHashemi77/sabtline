import type { Dispatch } from "redux";
import { DashboardActionTypes } from "../actionTypes/DashboardActionTypes";

export const clearUserClaims = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: DashboardActionTypes.UserClaimsClear });
  };
};
export const setUserReady = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: DashboardActionTypes.UserReady });
  };
};

export const clearUserReady = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: DashboardActionTypes.UserNotReady });
  };
};
