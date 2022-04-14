import { render, screen } from "@testing-library/react";
import { IEvent } from "../models/IEvent";
import EventCalendar from "./EventCalendar";
import { formatDate } from "../utils/date";

describe("<EventCalendar />", () => {
  test("event should be in the calendar", () => {
    const testEvent: IEvent = {
      author: "Author",
      guest: "Guest",
      date: formatDate(new Date()),
      description: "description",
    };
    render(<EventCalendar events={[testEvent]} />);
    const event = screen.getByText(/description/i);
    expect(event).toBeInTheDocument();
  });
});
