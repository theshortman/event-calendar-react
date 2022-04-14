import { AuthAction, AuthActionEnum } from "./types";
import authReducer from "./index";
import { IUser } from "../../../models/IUser";

describe("authReducer", () => {
  test("should return the initial state", () => {
    expect(authReducer(undefined, {} as AuthAction)).toEqual({
      isAuth: false,
      error: null,
      isLoading: false,
      user: {},
    });
  });

  test("should set isAuth with empty state", () => {
    expect(
      authReducer(undefined, {
        type: AuthActionEnum.SET_IS_AUTH,
        payload: true,
      })
    ).toEqual({ isAuth: true, error: null, isLoading: false, user: {} });
  });

  test("should set isAuth with not empty state", () => {
    const previousState = {
      isAuth: true,
      error: null,
      isLoading: false,
      user: {} as IUser,
    };

    expect(
      authReducer(previousState, {
        type: AuthActionEnum.SET_IS_AUTH,
        payload: false,
      })
    ).toEqual({ isAuth: false, error: null, isLoading: false, user: {} });
  });

  test("should set user with empty state", () => {
    const testUser: IUser = {
      username: "User",
      password: "pass",
    };

    expect(
      authReducer(undefined, {
        type: AuthActionEnum.SET_USER,
        payload: testUser,
      })
    ).toEqual({ isAuth: false, error: null, isLoading: false, user: testUser });
  });

  test("should set user with not empty state", () => {
    const testUser: IUser = {
      username: "User2",
      password: "pass2",
    };

    const previousState = {
      isAuth: false,
      error: null,
      isLoading: false,
      user: { username: "User1", password: "pass1" },
    };

    expect(
      authReducer(previousState, {
        type: AuthActionEnum.SET_USER,
        payload: testUser,
      })
    ).toEqual({ isAuth: false, error: null, isLoading: false, user: testUser });
  });

  test("should set error with empty state", () => {
    expect(
      authReducer(undefined, {
        type: AuthActionEnum.SET_ERROR,
        payload: "Test error",
      })
    ).toEqual({
      isAuth: false,
      error: "Test error",
      isLoading: false,
      user: {},
    });
  });

  test("should set error with not empty state", () => {
    const previousState = {
      isAuth: false,
      error: "Error",
      isLoading: false,
      user: {} as IUser,
    };

    expect(
      authReducer(previousState, {
        type: AuthActionEnum.SET_ERROR,
        payload: "Test error",
      })
    ).toEqual({
      isAuth: false,
      error: "Test error",
      isLoading: false,
      user: {},
    });
  });

  test("should set isLoading with empty state", () => {
    expect(
      authReducer(undefined, {
        type: AuthActionEnum.SET_IS_LOADING,
        payload: true,
      })
    ).toEqual({
      isAuth: false,
      error: null,
      isLoading: true,
      user: {} as IUser,
    });
  });

  test("should set isLoading with not empty state", () => {
    const previousState = {
      isAuth: false,
      error: null,
      isLoading: true,
      user: {} as IUser,
    };

    expect(
      authReducer(previousState, {
        type: AuthActionEnum.SET_IS_LOADING,
        payload: false,
      })
    ).toEqual({
      isAuth: false,
      error: null,
      isLoading: false,
      user: {} as IUser,
    });
  });
});
