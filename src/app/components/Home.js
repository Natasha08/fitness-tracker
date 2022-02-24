import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import Nutrition from 'app/components/Nutrition.js';
import ResponsiveDrawer from 'app/components/ResponsiveDrawer';
import LoginForm from 'app/components/LoginForm';

export default function Home() {
  const user = useSelector(({user}) => user);

  return (
    <Grid className="App"
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <ResponsiveDrawer/>

      {!user?.token ? (
        <div className="Main">
          <LoginForm/>
        </div>
      ) : (
        <>
          <div className="Main">
              Welcome! {user.email}
            <Routes>
              <Route path="/" element={<div></div>}/>
              <Route path="/nutrition" element={<Nutrition/>}/>
              <Route path="/daily" element={<div></div>} />
              <Route path="/settings" element={<div></div>} />
            </Routes>
          </div>
        </>
      )}
    </Grid>
  );
}
