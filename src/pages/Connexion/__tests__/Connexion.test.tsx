import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Connexion from "../Connexion";
// mock la reponse API

describe("Connexion Component", () => {
  test("renders all form fields", () => {
    render(
      <BrowserRouter>
        <Connexion />
      </BrowserRouter>
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Mot de passe")).toBeInTheDocument();
  });
  test("displays warning messages when form is submitted with empty fields", async () => {
    render(
      <BrowserRouter>
        <Connexion />
      </BrowserRouter>
    );
    fireEvent.submit(screen.getByText("Connexion"));
    await waitFor(() => {
      expect(screen.getByText("l'email est obligatoire")).toBeInTheDocument();
      expect(
        screen.getByText("le mot de passe est requis")
      ).toBeInTheDocument();
    });
  });
});
