import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function CreateEspaco() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nome: "",
    IdEspacoCultural: "",
  });

  const [espacosCulturais, setEspacosCulturais] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEspacosCulturais = async () => {
      try {
        const response = await axios.get("http://localhost:3000/espacocultural");
        setEspacosCulturais(response.data);
      } catch (error) {
        console.error("Erro ao carregar espaços culturais:", error);
      }
    };

    fetchEspacosCulturais();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/espaco", formData);
      console.log(response.data);
      setSuccessMessage("Espaço criado com sucesso!");
      setErrorMessage(""); // Limpa mensagem de erro se houver
      setFormData({
        Nome: "",
        IdEspacoCultural: "",
      });
    } catch (error) {
      console.error(error);
      setSuccessMessage(""); // Limpa mensagem de sucesso se houver
      setErrorMessage("Erro ao criar espaço.");
    }
  };

  const handleVoltar = () => {
    navigate("/manager"); // Navegar de volta para a página
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Criar Espaço
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
              value={formData.Nome}
              onChange={handleChange}
            />
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="IdEspacoCultural-label">Espaço Cultural</InputLabel>
              <Select
                labelId="IdEspacoCultural-label"
                id="IdEspacoCultural"
                name="IdEspacoCultural"
                label="Espaço Cultural"
                value={formData.IdEspacoCultural}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Selecione um espaço cultural</em>
                </MenuItem>
                {espacosCulturais.map((espaco) => (
                  <MenuItem key={espaco.IdEspacoCultural} value={espaco.IdEspacoCultural}>
                    {espaco.Nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: '150px', mb: 2 }}
              >
                Cadastrar
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
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateEspaco;
