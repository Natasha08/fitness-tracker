import React, { useState } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';

import Nutrition from './Nutrition.js';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import ResponsiveDrawer from './ResponsiveDrawer';

import { useLoginMutation } from './services/fitnessApi';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useLoginMutation({fixedCacheKey: 'user-auth'});
  const user = useSelector(({user}) => user);


  function login(e) {
    e.preventDefault();

    loginUser({email, password});
  }

  return (
    <div className="App">
      <Header/>
      <ResponsiveDrawer/>

      {user?.error && <div>{user.error}</div>}
      {!user?.token ? (
        <div className="Main">
          <form>
            <TextField
              id="outlined-textarea"
              label="Enter your Email"
              placeholder="Email"
              onChange={({target}) => setEmail(target.value)}
              fullWidth
            />
            <TextField
              id="outlined-textarea"
              label="Enter your Password"
              placeholder="Password"
              onChange={({target}) => setPassword(target.value)}
              fullWidth
            />
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
