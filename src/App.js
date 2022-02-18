import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/nutrition">Nutrition</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/about" element={<div>about</div>} />
          <Route path="/nutrition" element={<div>nutrition</div>} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
