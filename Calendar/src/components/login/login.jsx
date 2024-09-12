// src/pages/Login.js
import { useState } from 'react';
import { useAuth } from '../login/authContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Link, InputAdornment, Avatar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: { secondary: {
    main: '#00695f',
  },
},
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh" bgcolor="#fff">
      <Paper elevation={3} style={{ padding: '40px', borderRadius: '8px', maxWidth: '500px', width: '100%'}}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Link href="" variant="body2">
              Esqueceu sua senha?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ padding: '10px' }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
