import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Countries from "./components/Countries";
import Countrie from "./components/Countrie";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("dark-mode") === "true"
  );
  useEffect(() => {
    localStorage.setItem("dark-mode", dark);
  }, [dark]);
  return (
    <div id={dark ? "dark" : "light"}>
      <div id="nav" className="shadow-sm">
        <NavBar dark={dark} setDark={setDark} />
      </div>
      <Container>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/name/:name" element={<Countrie />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
