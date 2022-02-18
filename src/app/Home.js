import React, { useState } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, InputLabel, Button } from '@mui/material';

import Nutrition from './Nutrition.js';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

import { useLoginMutation } from './services/fitnessApi';
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
    <div className="App">
      <Header/>

      {user?.error && <div>{user.error}</div>}
      {!user?.token ? (
        <div className="Main">
          <form>
            <InputLabel>
              Email
              <Input onChange={({target}) => setEmail(target.value)}/>
            </InputLabel>
            <InputLabel>
              Password
              <Input onChange={({target}) => setPassword(target.value)} />
            </InputLabel>
            <Button variant="contained" onClick={(e) => login(e)}>Login</Button>
          </form>
        </div>
      ) : (
        <>
          <div className="Main">
              Welcome!
            <Routes>
              <Route path="/nutrition" element={<Nutrition/>}/>
              <Route path="/" element={<div></div>}/>
            </Routes>
            <Button variant="contained" onClick={logout}>Logout</Button>
          </div>
          <div className="Footer">
            <footer>
              <BottomNavigation />
            </footer>
          </div>
        </>
      )}
    </div>
  );
}
