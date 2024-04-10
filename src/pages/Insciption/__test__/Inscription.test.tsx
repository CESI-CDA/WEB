import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Inscription from "../Inscription";
import { BrowserRouter } from "react-router-dom";

describe("Inscription Component", () => {
  test("renders all form fields", () => {
    render(
      <BrowserRouter>
        <Inscription />
      </BrowserRouter>
    );
    expect(screen.getByText("Prénom")).toBeInTheDocument();
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Nom d'utilisateur")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Mot de passe")).toBeInTheDocument();
  });

  test("displays warning messages when form is submitted with empty fields", async () => {
    render(
      <BrowserRouter>
        <Inscription />
      </BrowserRouter>
    );
    fireEvent.submit(screen.getByText("inscription"));
    await waitFor(() => {
      expect(screen.getByText("le prénom est obligatoire")).toBeInTheDocument();
      expect(screen.getByText("le nom est obligatoire")).toBeInTheDocument();
      expect(
        screen.getByText("le pseudonyme est obligatoire")
      ).toBeInTheDocument();
      expect(screen.getByText("l'email est obligatoire")).toBeInTheDocument();
      expect(
        screen.getByText("le mot de passe est requis")
      ).toBeInTheDocument();
    });
  });
});
