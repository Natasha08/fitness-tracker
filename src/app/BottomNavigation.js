import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  return (
    <BottomNavigation
      value={value}
      showLabels
      onChange={(event, newValue) => {
        navigate(newValue);
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" icon={<RestoreIcon />} value={'/'}/>
      <BottomNavigationAction label="Food" icon={<FavoriteIcon />} value={'/nutrition'} />
    </BottomNavigation>
  );
}
