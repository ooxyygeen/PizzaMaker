import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("Header component", () => {
  it("should render Header component correctly", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const element = screen.getByText(/Твоя піца на Металістів 3/i);
    expect(element).toBeInTheDocument();
  });
});
