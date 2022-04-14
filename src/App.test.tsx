import { screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import App from "./App";
import { renderWithRedux } from "./utils/renderWithRedux";
import "./matchMedia.mock";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";

export const handlers = [
  rest.get("./users.json", (req, res, ctx) => {
    return res(
      ctx.json([{ username: "User", password: "pass" }]),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("<App />", () => {
  test("should print error if username is incorrect", async () => {
    renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "IncorrectUser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass" },
    });

    const loginButton = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "Username or password is incorrect!"
      );
    });
  });

  test("should print error if password is incorrect", async () => {
    renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "incorrectPassword" },
    });

    const loginButton = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "Username or password is incorrect!"
      );
    });
  });

  test("should redirect to the event page if username and passowrd are incorrect", async () => {
    renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass" },
    });

    const loginButton = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId("event-page")).toBeInTheDocument();
    });
  });
});
