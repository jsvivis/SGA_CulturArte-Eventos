import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import FestivalIcon from '@mui/icons-material/Festival';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

const theme = createTheme();

function CreateEvento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nome: "",
    Descricao: "",
    HorarioInicial: "",
    HorarioFinal: "",
    Valor: "",
    PublicoTotal: "",
    IdEspacoCultural: "",
    IdEspaco: "",
    IdCategoria: "", // Novo campo para a categoria selecionada
  });

  const [espacosCulturais, setEspacosCulturais] = useState([]);
  const [espacos, setEspacos] = useState([]);
  const [categorias, setCategorias] = useState([]); // Estado para armazenar categorias
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEspacosCulturais = async () => {
      try {
        const response = await axios.get("http://localhost:3000/espacocultural");
        setEspacosCulturais(response.data);
      } catch (error) {
        console.error("Erro ao buscar espaços culturais:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categoria");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchEspacosCulturais();
    fetchCategorias();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "IdEspacoCultural") {
      fetchEspacos(value);
    }
  };

  const fetchEspacos = async (idEspacoCultural) => {
    try {
      const response = await axios.get(`http://localhost:3000/espaco/${idEspacoCultural}`);
      setEspacos(response.data);
    } catch (error) {
      console.error("Erro ao buscar espaços:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { IdEspacoCultural, ...formDataToSend } = formData;
      console.log(formData)
      const response = await axios.post("http://localhost:3000/evento", formData);
      console.log(formData)
      console.log(response.data);
      setSuccessMessage("Evento criado com sucesso!");
      setErrorMessage("");
      setFormData({
        Nome: "",
        Descricao: "",
        ImagemEvento: "",
        HorarioInicial: "",
        HorarioFinal: "",
        Valor: "",
        PublicoTotal: "",
        IdEspacoCultural: "",
        IdEspaco: "",
        IdCategoria: "", // Limpar a categoria selecionada após o envio
      });
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setErrorMessage("Erro ao criar evento");
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
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <FestivalIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastrar Evento
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="Nome"
              autoFocus
              value={formData.Nome}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="HorarioInicial"
              label="Início"
              name="HorarioInicial"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.HorarioInicial}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="HorarioFinal"
              label="Final"
              name="HorarioFinal"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.HorarioFinal}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Valor"
              label="Valor"
              name="Valor"
              autoComplete="Valor"
              value={formData.Valor}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="PublicoTotal"
              label="Publico Total"
              name="PublicoTotal"
              autoComplete="PublicoTotal"
              value={formData.PublicoTotal}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Descricao"
              label="Descrição"
              name="Descricao"
              autoComplete="Descricao"
              multiline
              rows={4}
              value={formData.Descricao}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="espacoCultural-label">Espaço Cultural</InputLabel>
              <Select
                labelId="espacoCultural-label"
                id="IdEspacoCultural"
                name="IdEspacoCultural"
                label="Espaço Cultural"
                value={formData.IdEspacoCultural}
                onChange={handleChange}
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="espaco-label">Espaço</InputLabel>
              <Select
                labelId="espaco-label"
                id="IdEspaco"
                name="IdEspaco"
                label="Espaço"
                value={formData.IdEspaco}
                onChange={handleChange}
                disabled={!formData.IdEspacoCultural}
              >
                <MenuItem value="">
                  <em>Selecione um espaço</em>
                </MenuItem>
                {espacos.map((espaco) => (
                  <MenuItem key={espaco.IdEspaco} value={espaco.IdEspaco}>
                    {espaco.Nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                id="IdCategoria"
                name="IdCategoria"
                label="Categoria"
                value={formData.IdCategoria}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Selecione uma categoria</em>
                </MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.IdCategoria} value={categoria.IdCategoria}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: categoria.Cor,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          marginRight: 1,
                        }}
                      />
                      {categoria.Nome}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Button type="submit" variant="contained" sx={{ width: 150 }}>
                Cadastrar
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
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
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateEvento;
