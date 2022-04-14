import { AppDispath } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import {
  GuestActionEnum,
  SetGuestsAction,
  SetIsLoadingAction,
  SetErrorAction,
} from "./types";

export const GuestActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: GuestActionEnum.SET_GUESTS,
    payload,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: GuestActionEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: GuestActionEnum.SET_ERROR,
    payload: error,
  }),
  fetchGuests: () => async (dispatch: AppDispath) => {
    try {
      dispatch(GuestActionCreators.setIsLoading(true));
      const response = await UserService.getUsers();
      dispatch(GuestActionCreators.setGuests(response.data));
      dispatch(GuestActionCreators.setIsLoading(false));
    } catch (e) {
      dispatch(GuestActionCreators.setError("Failed to get guest list."));
    }
  },
};
