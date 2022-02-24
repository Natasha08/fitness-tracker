import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useLoginMutation } from 'app/services/FitnessAPI';
import { onChange, preventDefault } from 'app/helpers/events';
import FormHelperText from '@mui/material/FormHelperText';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, togglePasswordVisibility] = useState(false);
  const [loginUser] = useLoginMutation({fixedCacheKey: 'user-auth'});

  const login = () => {
    loginUser({email, password})
    .then((response) => {
      if (!_.isEmpty(response?.error)) {
        setError('Error logging in, please try again.');
      }
    })
  };

  return (
    <form className="login-form">
      <div>
        <h2>Login to continue</h2>
        {!!error && <FormHelperText error={true}>{error}</FormHelperText>}
      </div>

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
      <Button variant="contained" onClick={preventDefault(login)}>Login</Button>
    </form>
  )
}

export default LoginForm;
