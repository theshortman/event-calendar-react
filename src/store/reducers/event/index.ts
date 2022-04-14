import { EventAction, EventActionEnum, EventState } from "./types";

const initialState: EventState = {
  events: [],
  error: null,
};

export default function eventReducer(
  state = initialState,
  action: EventAction
): EventState {
  switch (action.type) {
    case EventActionEnum.SET_EVENTS:
      return { ...state, events: action.payload };
    case EventActionEnum.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
