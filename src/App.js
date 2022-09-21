import "./App.css";
import "./mobile.css";
import "./assets/fonts/gilroy/stylesheet.css";
import { LayoutComponent } from "./layout/layout";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <LayoutComponent>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      </BrowserRouter>
    </LayoutComponent>
  );
}

export default App;
