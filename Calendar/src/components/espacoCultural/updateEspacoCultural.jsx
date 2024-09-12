// BIBLIOTECAS
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';

// FRAMEWORKS - MATERIAL UI
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function UpdateEspacoCultural() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    Nome: '',
    Cep: '',
    Endereco: '',
    Numero: '',
    Complemento: '',
    Cidade: '',
    Estado: '',
    Telefone: '',
    Email: '',
    Ativo: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/espacocultural/${id}`);
        const userData = response.data[0];
        setUser({
          Nome: userData.Nome,
          Cep: userData.Cep,
          Endereco: userData.Endereco,
          Numero: userData.Numero,
          Complemento: userData.Complemento,
          Cidade: userData.Cidade,
          Estado: userData.Estado,
          Telefone: userData.Telefone,
          Email: userData.Email,
          Ativo: userData.Ativo
        });
        setError(null);
      } catch (error) {
        setError("Erro ao carregar espaço cultural");
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
      await axios.put(`http://localhost:3000/espacocultural/${id}`, user);
      setError(null);
      setSuccessMessage("Espaço cultural atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar espaço cultural");
    }
  };

  const handleVoltar = () => {
    navigate("/buscarespacocultural"); // Navegar de volta para a página
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

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
              <MuseumOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Atualizar Espaço Cultural
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              value={user.Nome}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Cep"
              label="Cep"
              name="Cep"
              value={user.Cep}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Endereco"
              label="Endereço"
              name="Endereco"
              value={user.Endereco}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Numero"
              label="Número"
              name="Numero"
              value={user.Numero}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Complemento"
              label="Complemento"
              name="Complemento"
              value={user.Complemento}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Cidade"
              label="Cidade"
              name="Cidade"
              value={user.Cidade}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Estado"
              label="Estado"
              name="Estado"
              value={user.Estado}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Telefone"
              label="Telefone"
              name="Telefone"
              value={user.Telefone}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              value={user.Email}
              onChange={handleChange}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Ativo"
                  checked={user.Ativo}
                  onChange={handleChange}
                />
              }
              label="Ativo"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 3,
                mb: 2
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150 }}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                sx={{ width: 150 }}
                onClick={handleVoltar}
              >
                Voltar
              </Button>
            </Box>
          </Box>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateEspacoCultural;
