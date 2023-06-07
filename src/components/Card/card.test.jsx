import { render, screen } from "@testing-library/react";
import Card from "./Card";
import "@testing-library/jest-dom/extend-expect";

const cardProps = {
  imageURI: "src/assets/pizza1.jpg",
  pizzaName: "4 м'яса",
  pizzaParts: [
    "Соус томатний",
    "цибуля маринована",
    "салямі баликова",
    "ковбаски баварські",
    "курка маринована",
    "бекон",
    "сир моцарела",
    "часникова олія",
  ],
  pizzaPrice: 50,
};

describe("Card component", () => {
  it("should render Card component correctly", () => {
    render(<Card {...cardProps} />);
    const element = screen.getByText("4 м'яса");
    expect(element).toBeInTheDocument();
  });
});
