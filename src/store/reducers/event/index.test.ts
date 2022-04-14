import { EventAction, EventActionEnum } from "./types";
import eventReducer from "./index";
import { IEvent } from "../../../models/IEvent";

describe("eventReducer", () => {
  test("should return the initial state", () => {
    expect(eventReducer(undefined, {} as EventAction)).toEqual({
      events: [],
      error: null,
    });
  });

  test("should set enents with empty state", () => {
    const testEvent: IEvent = {
      author: "Author",
      guest: "Guest",
      date: "Date",
      description: "description",
    };

    expect(
      eventReducer(undefined, {
        type: EventActionEnum.SET_EVENTS,
        payload: [testEvent],
      })
    ).toEqual({ events: [testEvent], error: null });
  });

  test("should set enents with not empty state", () => {
    const testEvent: IEvent = {
      author: "Author2",
      guest: "Guest2",
      date: "Date2",
      description: "description2",
    };

    const previousState = {
      events: [
        {
          author: "Author1",
          guest: "Guest1",
          date: "Date1",
          description: "description1",
        },
      ],
      error: null,
    };

    expect(
      eventReducer(previousState, {
        type: EventActionEnum.SET_EVENTS,
        payload: [testEvent],
      })
    ).toEqual({ events: [testEvent], error: null });
  });

  test("should set error with empty state", () => {
    expect(
      eventReducer(undefined, {
        type: EventActionEnum.SET_ERROR,
        payload: "Test error",
      })
    ).toEqual({ events: [], error: "Test error" });
  });

  test("should set error with not empty state", () => {
    const previousState = { events: [], error: "Error" };

    expect(
      eventReducer(previousState, {
        type: EventActionEnum.SET_ERROR,
        payload: "Test error",
      })
    ).toEqual({ events: [], error: "Test error" });
  });
});
