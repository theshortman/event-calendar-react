import { screen, fireEvent } from "@testing-library/react";
import React from "react";
import Event from "./Event";
import { renderWithRedux } from "../utils/renderWithRedux";
import "../matchMedia.mock";
import { store } from "../store";

const initialState = store.getState();
const preloadedState = {
  ...initialState,
  auth: {
    ...initialState.auth,
    isAuth: true,
    user: {
      username: "User",
      password: "pass",
    },
  },
  guest: {
    ...initialState.guest,
    guests: [
      {
        username: "User",
        password: "pass",
      },
    ],
  },
};

describe("<Event />", () => {
  test("modal with form for adding event should not be in the document", () => {
    renderWithRedux(<Event />, preloadedState);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("modal with form for adding event should be in the document if user clicked on the button", async () => {
    renderWithRedux(<Event />, preloadedState);

    const addEventButton = screen.getByRole("button", { name: "Add Event" });
    fireEvent.click(addEventButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
