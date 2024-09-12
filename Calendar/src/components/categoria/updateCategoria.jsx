import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function UpdateCategoria() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoria, setCategoria] = useState({
    Nome: '',
    Cor: '',
    Ativo: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categoria/${id}`);
        const categoriaData = response.data[0]; // Acessa o primeiro objeto no array
        setCategoria({
          Nome: categoriaData.Nome,
          Cor: categoriaData.Cor,
          Ativo: categoriaData.Ativo
        });
        setError(null);
      } catch (error) {
        setError("Erro ao carregar categoria");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCategoria({ ...categoria, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/categoria/${id}`, categoria);
      setError(null);
      setSuccessMessage("Categoria atualizada com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar categoria");
    }
  };

  const handleVoltar = () => {
    navigate("/buscarcategoria"); // Navegar de volta para a página
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
            <TheaterComedyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Atualizar Categoria
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="off"
              value={categoria.Nome || ''}
              onChange={handleChange}
            />
            <Box sx={{ mt: 3, width: '100%' }}>
              <label>Cor:</label>
              <input
                type="color"
                name="Cor"
                className="form-control"
                value={categoria.Cor || '#000000'} // Define uma cor padrão se estiver vazia
                onChange={handleChange}
                style={{ width: '100%', height: '56px', marginTop: '8px' }}
                required
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={categoria.Ativo}
                  onChange={handleChange}
                  name="Ativo"
                />
              }
              label="Ativo"
              sx={{ mt: 2 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: '150px', mb: 2 }}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                onClick={handleVoltar}
                sx={{ width: '150px' }}
              >
                Voltar
              </Button>
            </Box>
          </Box>
          
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateCategoria;
