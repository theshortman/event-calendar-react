import { screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import LoginForm from "./LoginForm";
import { renderWithRedux } from "../utils/renderWithRedux";
import "../matchMedia.mock";

describe("<LoginForm />", () => {
  test("should print error when username is empty", async () => {
    renderWithRedux(<LoginForm />);

    const loginButton = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId("username")).toHaveTextContent(
        "Please input your username!"
      );
    });
  });

  test("should print error when password is empty", async () => {
    renderWithRedux(<LoginForm />);

    const loginButton = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId("password")).toHaveTextContent(
        "Please input your password!"
      );
    });
  });
});
