import { AppDispath } from "../..";
import { IEvent } from "../../../models/IEvent";
import { EventActionEnum, SetEventsAction, SetErrorAction } from "./types";

export const EventActionCreators = {
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }),
  setError: (error: string): SetErrorAction => ({
    type: EventActionEnum.SET_ERROR,
    payload: error,
  }),
  createEvent: (event: IEvent) => async (dispatch: AppDispath) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
    } catch (e) {
      dispatch(EventActionCreators.setError("Failed to create event."));
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispath) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(
        (ev) => ev.author === username || ev.guest === username
      );
      dispatch(EventActionCreators.setEvents(currentUserEvents));
      localStorage.setItem("events", JSON.stringify(json));
    } catch (e) {
      dispatch(EventActionCreators.setError("Failed to get event list."));
    }
  },
};
