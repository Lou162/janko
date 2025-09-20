import "./index.css";
import App from "./pages/Home/App.tsx";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/game/GamePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className='container'>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route
            path='/'
            element={<App />}
          />
          <Route
            path='/game'
            element={<GamePage />}
          />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </div>
);
