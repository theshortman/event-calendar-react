import { screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import Navbar from "../components/Navbar";
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
};

describe("<Navbar />", () => {
  test("should display login link if user is not auth", async () => {
    renderWithRedux(<Navbar />);

    await waitFor(() => {
      expect(screen.getByText("Log In")).toBeInTheDocument();
    });
  });

  test("should not display logout link if user is not auth", async () => {
    renderWithRedux(<Navbar />);

    await waitFor(() => {
      expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
    });
  });

  test("should display logout link if user is auth", async () => {
    renderWithRedux(<Navbar />, preloadedState);

    await waitFor(() => {
      expect(screen.getByText("Log Out")).toBeInTheDocument();
    });
  });

  test("should not display login link if user is auth", async () => {
    renderWithRedux(<Navbar />, preloadedState);

    await waitFor(() => {
      expect(screen.queryByText("Log In")).not.toBeInTheDocument();
    });
  });

  test("should display username link if the user is auth", async () => {
    renderWithRedux(<Navbar />, preloadedState);

    await waitFor(() => {
      expect(screen.getByText(/user/i)).toBeInTheDocument();
    });
  });

  test("should display login link after user clicked on the logout", async () => {
    renderWithRedux(<Navbar />, preloadedState);

    const logoutLink = screen.getByText("Log Out");
    fireEvent.click(logoutLink);

    await waitFor(() => {
      expect(screen.getByText("Log In")).toBeInTheDocument();
    });
  });
});
