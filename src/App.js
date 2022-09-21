import logo from "./logo.svg";
import "./App.css";
import "./assets/fonts/gilroy/stylesheet.css";
import { LayoutComponent } from "./layout/layout";
import Home from "./pages/home";

function App() {
  return (
    <LayoutComponent>
      <Home/>
    </LayoutComponent>
  );
}

export default App;
