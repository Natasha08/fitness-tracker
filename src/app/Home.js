import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Nutrition from './Nutrition.js';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import ResponsiveDrawer from './ResponsiveDrawer';
import { useLoginMutation } from './services/FitnessAPI';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, togglePasswordVisibility] = useState(false);

  const [loginUser] = useLoginMutation({fixedCacheKey: 'user-auth'});
  const user = useSelector(({user}) => user);


  function login(e) {
    e.preventDefault();

    loginUser({email, password});
  }

  return (
    <Grid className="App"
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <Header/>
      <ResponsiveDrawer/>

      {user?.error && <div>{user.error}</div>}
      {!user?.token ? (
        <div className="Main">
          <form className="login-form">
            <TextField
              label="Enter your Email"
              placeholder="Email"
              onChange={({target}) => setEmail(target.value)}
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="Enter your Password"
              placeholder="Password"
              onChange={({target}) => setPassword(target.value)}
              InputProps={{endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility((visibility) => !visibility)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}}
            />
            <Button variant="contained" onClick={(e) => login(e)}>Login</Button>
          </form>
        </div>
      ) : (
        <>
          <div className="Main">
              Welcome! {user.email}
            <Routes>
              <Route path="/nutrition" element={<Nutrition/>}/>
              <Route path="/" element={<div></div>}/>
            </Routes>
          </div>
        </>
      )}
      <div className="Footer">
        <BottomNavigation />
      </div>
    </Grid>
  );
}
