import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteCmpt from "./Routes/Routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RouteCmpt />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
