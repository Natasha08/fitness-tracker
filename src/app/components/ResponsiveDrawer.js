import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { APP_RESET } from 'app/reducers/user';
import { navigationList } from 'app/helpers/navigation';
import { preventDefault } from 'app/helpers/events';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [open, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({user}) => user);

  function logOut() {
    dispatch(APP_RESET());
    setMobileOpen(false);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!open);
  };

  const drawer = (
    <div>
      <Toolbar>
        {user?.email}
      </Toolbar>
      <Divider />
      <List>
        {navigationList.map(({name, path, Icon}) => {
          return <ListItem button key={name} component={Link} to={path} onClick={handleDrawerToggle}>
            <ListItemIcon>
              <Icon/>
            </ListItemIcon>
            <ListItemText primary={name}/>
          </ListItem>
        })}
      </List>
      <Divider/>
      <List>
        <ListItem button key="logout" onClick={preventDefault(logOut)}>
          <ListItemIcon>
            <Logout/>
          </ListItemIcon>
          <ListItemText primary="Logout"/>
        </ListItem>
      </List>
      <Divider/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Fitness Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth }, flexShrink: {sm: 0}}}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{keepMounted: true}}
          sx={{'& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}}}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
