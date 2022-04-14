import { GuestAction, GuestActionEnum } from "./types";
import guestReducer from "./index";
import { IUser } from "../../../models/IUser";

describe("guestReducer", () => {
  test("should return the initial state", () => {
    expect(guestReducer(undefined, {} as GuestAction)).toEqual({
      guests: [],
      error: null,
      isLoading: false,
    });
  });

  test("should set guests with empty state", () => {
    const testGuest: IUser = {
      username: "User",
      password: "pass",
    };

    expect(
      guestReducer(undefined, {
        type: GuestActionEnum.SET_GUESTS,
        payload: [testGuest],
      })
    ).toEqual({ guests: [testGuest], error: null, isLoading: false });
  });

  test("should set guests with not empty state", () => {
    const testGuest: IUser = {
      username: "User2",
      password: "pass2",
    };

    const previousState = {
      guests: [
        {
          username: "User1",
          password: "pass1",
        },
      ],
      error: null,
      isLoading: false,
    };

    expect(
      guestReducer(previousState, {
        type: GuestActionEnum.SET_GUESTS,
        payload: [testGuest],
      })
    ).toEqual({ guests: [testGuest], error: null, isLoading: false });
  });

  test("should set error with empty state", () => {
    expect(
      guestReducer(undefined, {
        type: GuestActionEnum.SET_ERROR,
        payload: "Test error",
      })
    ).toEqual({ guests: [], error: "Test error", isLoading: false });
  });

  test("should set error with not empty state", () => {
    const previousState = { guests: [], error: "Error", isLoading: false };

    expect(
      guestReducer(previousState, {
        type: GuestActionEnum.SET_ERROR,
        payload: "Test error",
      })
    ).toEqual({ guests: [], error: "Test error", isLoading: false });
  });

  test("should set isLoading with empty state", () => {
    expect(
      guestReducer(undefined, {
        type: GuestActionEnum.SET_IS_LOADING,
        payload: true,
      })
    ).toEqual({ guests: [], error: null, isLoading: true });
  });

  test("should set isLoading with not empty state", () => {
    const previousState = { guests: [], error: null, isLoading: true };

    expect(
      guestReducer(previousState, {
        type: GuestActionEnum.SET_IS_LOADING,
        payload: false,
      })
    ).toEqual({ guests: [], error: null, isLoading: false });
  });
});
