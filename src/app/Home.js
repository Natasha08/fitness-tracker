import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Nutrition from './Nutrition.js';
import { useLoginMutation } from './services/fitnessApi';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from './reducers/user';

export default function Home() {
  const dispatch = useDispatch();
  const [
    loginUser,
    result
  ] = useLoginMutation({fixedCacheKey: 'user-auth'});
  const user = useSelector(({user}) => user);

  function login() {
    loginUser({email: "natasha@example.com", password: "password"})
  }

  function logout() {
    dispatch(logOut());
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
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
