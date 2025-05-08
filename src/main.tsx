import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/styles/globals.css";
import Home from "./components/home";
import Auth from "./components/auth";
import "./index.css"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AdminPortal from "./components/adminPortal";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
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




