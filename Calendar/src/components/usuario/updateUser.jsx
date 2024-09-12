// BIBLIOTECAS
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// FRAMEWORKS - MATERIAL UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ Nome: '', Email: '', Ativo: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/usuario/${id}`);
        const userData = response.data[0]; // Acessa o primeiro objeto no array
        setUser({
          Nome: userData.Nome,
          Email: userData.Email,
          Ativo: userData.Ativo
        });
        setError(null);
      } catch (error) {
        setError("Erro ao carregar usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/usuario/${id}`, user);
      setError(null);
      setMessage("Usuário atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar usuário");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleVoltar = () => {
    navigate("/buscarusuario"); // Navegar de volta para a página de busca
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Atualizar Usuário
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="nome"
              autoFocus
              value={user.Nome || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoComplete="email"
              value={user.Email || ''}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.Ativo}
                  onChange={handleChange}
                  name="Ativo"
                />
              }
              label="Ativo"
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150 }}
              >
                Salvar
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ width: 150 }}
                onClick={handleVoltar}
              >
                Voltar
              </Button>
            </Box>
          </Box>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateUser;
