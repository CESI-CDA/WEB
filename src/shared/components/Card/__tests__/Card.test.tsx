import { render, screen } from "@testing-library/react";
import CardRessource from "../Card";
import { BrowserRouter } from "react-router-dom";

test("renders CardRessource component with correct props", () => {
  const mockRessource = {
    titre_res: "Mock Title",
    contenu_res: "Mock Content",
    url_res: "https://example.com/mock-image.jpg",
  };

  render(
    <BrowserRouter>
      <CardRessource {...mockRessource} />
    </BrowserRouter>
  );

  const titleElement = screen.getByText(mockRessource.titre_res);
  const contentElement = screen.getByText(mockRessource.contenu_res);
  const imageElement = screen.getByRole("img");
  const buttonElement = screen.getByRole("button", { name: "Voir" });

  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

// tester le click sur une ressource
