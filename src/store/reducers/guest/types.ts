import { IUser } from "../../../models/IUser";

export interface GuestState {
  guests: IUser[];
  isLoading: boolean;
  error: string | null;
}

export enum GuestActionEnum {
  SET_GUESTS = "SET_GUESTS",
  SET_ERROR = "SET_ERROR",
  SET_IS_LOADING = "SET_IS_LOADING",
}

export interface SetGuestsAction {
  type: GuestActionEnum.SET_GUESTS;
  payload: IUser[];
}

export interface SetErrorAction {
  type: GuestActionEnum.SET_ERROR;
  payload: string;
}

export interface SetIsLoadingAction {
  type: GuestActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type GuestAction = SetGuestsAction | SetErrorAction | SetIsLoadingAction;
