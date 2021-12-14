import { render } from "react-dom";
import App from "./App";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
