import React, { useState } from 'react';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Nutrition from './Nutrition.js';
import { useLoginMutation } from './services/fitnessApi';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './reducers/user';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loginUser] = useLoginMutation({fixedCacheKey: 'user-auth'});
  const user = useSelector(({user}) => user);


  function login(e) {
    e.preventDefault();

    loginUser({email, password});
  }

  function logout() {
    dispatch(logOut());
  }

  return (
    <div>
      {user?.error && <div>{user.error}</div>}
      {!user?.token ? (
        <form>
          <label>
            Email
            <input onChange={({target}) => setEmail(target.value)}/>
          </label>
          <label>
            Password
            <input onChange={({target}) => setPassword(target.value)} />
          </label>
          <button onClick={(e) => login(e)}>Login</button>
        </form>
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
