import { render } from "react-dom";
import App from "./App";
import NewCard from "./pages/NewCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/add" element={<NewCard />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
