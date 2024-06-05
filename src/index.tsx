import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);
