import React, { useEffect, useState } from "react";
import { useLoginMutation } from './services/user';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Nutrition from './Nutrition.js';

export default function Home() {
  const [user, setUser] = useState(null);
  const [
    loginUser,
    result
  ] = useLoginMutation({fixedCacheKey: 'user-auth'});

  function login() {
    loginUser({email: "natasha@example.com", password: "password"})
      .unwrap()
      .then((payload) => setUser(payload))
      .catch(() => setUser({error: 'failed to login to server'}));
  }

  return (
    <div>
      {user?.error && <div>{user.error}</div>}
      {!user?.token ? (
      <button onClick={login}>Login</button>
      ) : (
        <div>
            {user?.email}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/nutrition">Nutrition</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/nutrition" element={<Nutrition/>}/>
            <Route path="/" element={<div></div>}/>
          </Routes>
        </div>
      )}
    </div>
  );
}
