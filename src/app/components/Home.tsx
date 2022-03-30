import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import Nutrition from './Nutrition';
import ResponsiveDrawer from './ResponsiveDrawer';
import LoginForm from './LoginForm';

export default function Home() {
  const user = useSelector((state: any) => state.user);

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
            <Routes>
              <Route path="/" element={<h2>Welcome {user.email}!</h2>}/>
              <Route path="/nutrition" element={<Nutrition/>}/>
              <Route path="/daily" element={<h2>Daily</h2>} />
              <Route path="/settings" element={<h2>Settings</h2>} />
            </Routes>
          </div>
        </>
      )}
    </Grid>
  );
}
