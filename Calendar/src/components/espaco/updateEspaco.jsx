// BIBLIOTECAS
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import WindowIcon from '@mui/icons-material/Window';

// FRAMEWORKS - MATERIAL UI
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  TextField,
  Typography,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function UpdateEspaco() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    Nome: "",
    IdEspacoCultural: "",
    Ativo: false,
  });
  const [espacosCulturais, setEspacosCulturais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEspaco = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/espacoEditar/${id}`);
        const userData = response.data[0]; // Acessa o primeiro objeto no array
        setUser({
          Nome: userData.Nome,
          IdEspacoCultural: userData.IdEspacoCultural,
          Ativo: userData.Ativo,
        });
        setError(null);
      } catch (error) {
        setError("Erro ao carregar espaço");
      } finally {
        setLoading(false);
      }
    };

    const fetchEspacosCulturais = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/espacocultural"
        );
        setEspacosCulturais(response.data);
      } catch (error) {
        console.error("Erro ao carregar espaços culturais:", error);
      }
    };

    fetchEspaco();
    fetchEspacosCulturais();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/espaco/${id}`, user);
      setError(null);
      setSuccessMessage("Espaço atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar espaço");
    }
  };

  const handleVoltar = () => {
    navigate("/buscarespaco"); // Navegar de volta para a página
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <WindowIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Atualizar Espaço
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="off"
              value={user.Nome}
              onChange={handleChange}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="IdEspacoCultural-label">
                Espaço Cultural
              </InputLabel>
              <Select
                label="Espaço Cultural"
                labelId="IdEspacoCultural-label"
                id="IdEspacoCultural"
                name="IdEspacoCultural"
                value={user.IdEspacoCultural}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Selecione um espaço cultural</em>
                </MenuItem>
                {espacosCulturais.map((espaco) => (
                  <MenuItem
                    key={espaco.IdEspacoCultural}
                    value={espaco.IdEspacoCultural}
                  >
                    {espaco.Nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Ativo</FormLabel>
              <FormGroup>
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
              </FormGroup>
            </FormControl>
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

export default UpdateEspaco;
