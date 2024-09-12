import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './login/authContext';
import { Box, Typography, IconButton, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Button } from '@mui/material';


const theme = createTheme({
  palette: { secondary: {
      main: '#00695f',
    },
  },
});

export default function Navbar() {
  const { user, logout } = useAuth(); // Obtém o usuário e a função de logout do contexto de autenticação

  // Função para obter o nome do usuário do localStorage
  const getUserNameFromLocalStorage = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      return userObj.nome;
    }
    return '';
  };

  const userName = getUserNameFromLocalStorage(); // Obtém o nome do usuário

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '80px',
          backgroundColor: '#66aea6',
          m: 0,
          p: 0,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: '#000',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link 
            to="/"
            style={{
              color: '#000',
              textDecoration: 'none',
              fontFamily: 'Varela Round',
              marginLeft: '60px',
              fontWeight:"fontWeightBold",
            }}
          >
            AGENDA CULTURAL
          </Link>
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: 6, fontWeight:"fontWeightBold"}}>
            <Typography variant="bold" sx={{ color: '#000', mr: 3}}>
              Olá, {userName}.
            </Typography>
            <IconButton component={Link} to="/manager" sx={{ color: '#00695f' }}>
              <HandymanIcon fontSize="large" />
            </IconButton>
            <Button variant="contained" color="secondary" onClick={logout} sx={{ ml: 2 }}>
              Sair
            </Button>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
