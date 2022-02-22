import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useLoginMutation } from 'app/services/FitnessAPI';
import { onChange, preventDefault } from 'app/helpers/events';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, togglePasswordVisibility] = useState(false);

  const [loginUser] = useLoginMutation({fixedCacheKey: 'user-auth'});

  return (
    <form className="login-form">
      <TextField
        value={email}
        label="Enter your Email"
        placeholder="Email"
        onChange={onChange(setEmail)}
      />
      <TextField
        value={password}
        type={showPassword ? 'text' : 'password'}
        label="Enter your Password"
        placeholder="Password"
        onChange={onChange(setPassword)}
        InputProps={{endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => togglePasswordVisibility((visibility) => !visibility)}
              edge="end"
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        )}}
      />
      <Button variant="contained" onClick={preventDefault(loginUser, {email, password})}>Login</Button>
    </form>
  )
}

export default LoginForm;
