import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  it("display with logo and icon", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByAltText("logo ressources relationnelles")).toBeDefined();
    expect(screen.getByTestId("PersonIcon")).toBeDefined();
  });
});
