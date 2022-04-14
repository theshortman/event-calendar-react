import { screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import EventForm from "./EventForm";
import { renderWithRedux } from "../utils/renderWithRedux";
import "../matchMedia.mock";

describe("<EventForm />", () => {
  test("should print error when description is empty", async () => {
    renderWithRedux(
      <EventForm guests={[]} isLoading={false} submit={() => {}} />
    );

    const createButton = screen.getByRole("button", { name: "Create" });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("description")).toHaveTextContent("Required!");
    });
  });

  test("should print error when guest is empty", async () => {
    renderWithRedux(
      <EventForm guests={[]} isLoading={false} submit={() => {}} />
    );

    const createButton = screen.getByRole("button", { name: "Create" });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("guest")).toHaveTextContent("Required!");
    });
  });
});
