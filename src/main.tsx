import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/styles/globals.css";
import Home from "./components/home";
import "./index.css"
import {ThemeProvider as NextThemesProvider} from "next-themes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextThemesProvider defaultTheme="dark" attribute="class">
      <App />
    </NextThemesProvider>
  </React.StrictMode>,
);




