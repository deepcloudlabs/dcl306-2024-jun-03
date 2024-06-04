import React from 'react';
import ReactDOM from 'react-dom/client';
import Mastermind from "./mastermind";
import "bootstrap/dist/css/bootstrap.css";
import {Route, Routes} from "react-router";
import PlayerLoses from "./loses/player-loses";
import PlayerWins from "./wins/player-wins";
import {BrowserRouter} from "react-router-dom";
const routing =
    <Routes>
        <Route path="/" element={<Mastermind></Mastermind>} exact></Route>
        <Route path="/loses" element={<PlayerLoses></PlayerLoses>}></Route>
        <Route path="/wins" element={<PlayerWins></PlayerWins>}></Route>
    </Routes>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      {routing}
  </BrowserRouter>
);
