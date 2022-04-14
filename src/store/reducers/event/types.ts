import { IEvent } from "../../../models/IEvent";

export interface EventState {
  events: IEvent[];
  error: string | null;
}

export enum EventActionEnum {
  SET_EVENTS = "SET_EVENTS",
  SET_ERROR = "SET_ERROR",
}

export interface SetEventsAction {
  type: EventActionEnum.SET_EVENTS;
  payload: IEvent[];
}

export interface SetErrorAction {
  type: EventActionEnum.SET_ERROR;
  payload: string;
}

export type EventAction = SetEventsAction | SetErrorAction;
