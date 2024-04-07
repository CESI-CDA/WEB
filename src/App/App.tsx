import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteCmpt from "./Routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <RouteCmpt />
    </BrowserRouter>
  );
}

export default App;
