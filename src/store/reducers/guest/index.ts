import { GuestState, GuestAction, GuestActionEnum } from "./types";

const initialState: GuestState = {
  guests: [],
  error: null,
  isLoading: false,
};

export default function guestReducer(
  state = initialState,
  action: GuestAction
): GuestState {
  switch (action.type) {
    case GuestActionEnum.SET_GUESTS:
      return { ...state, guests: action.payload };
    case GuestActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case GuestActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
