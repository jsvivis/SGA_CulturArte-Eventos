import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FestivalIcon from '@mui/icons-material/Festival';
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  TextField,
  Typography,
  Alert,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function UpdateEvento() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [evento, setEvento] = useState({
    Nome: "",
    Descricao: "",
    HorarioInicial: "",
    HorarioFinal: "",
    Valor: "",
    Publico: "",
    PublicoTotal: "",
    Ativo: false,
    IdEspacoCultural: "",
    IdEspaco: "",
    IdCategoria: ""
  });
  const [espacosCulturais, setEspacosCulturais] = useState([]);
  const [espacos, setEspacos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [categorias, setCategorias] = useState([]);

  // Função para buscar categorias
  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categoria");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/evento/${id}`);
        const eventoData = response.data[0];
        setEvento({
          Nome: eventoData.Nome,
          Descricao: eventoData.Descricao,
          HorarioInicial: eventoData.HorarioInicial,
          HorarioFinal: eventoData.HorarioFinal,
          Valor: eventoData.Valor,
          Publico: eventoData.Publico,
          PublicoTotal: eventoData.PublicoTotal,
          Ativo: eventoData.Ativo,
          IdEspacoCultural: eventoData.IdEspacoCultural,
          IdEspaco: eventoData.IdEspaco,
          IdCategoria: eventoData.IdCategoria,
        });
        setError(null);
      } catch (error) {
        setError("Erro ao carregar evento");
      } finally {
        setLoading(false);
      }
    };

    const fetchEspacosCulturais = async () => {
      try {
        const response = await axios.get("http://localhost:3000/espacocultural");
        setEspacosCulturais(response.data);
      } catch (error) {
        console.error("Erro ao carregar espaços culturais:", error);
      }
    };

    fetchCategorias();
    fetchEvento();
    fetchEspacosCulturais();
  }, [id]);

  useEffect(() => {
    if (evento.IdEspacoCultural) {
      const fetchEspacos = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/espaco/${evento.IdEspacoCultural}`);
          setEspacos(response.data);
        } catch (error) {
          console.error("Erro ao carregar espaços:", error);
        }
      };

      fetchEspacos();
    }
  }, [evento.IdEspacoCultural]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEvento({ ...evento, [name]: type === "checkbox" ? checked : value });

    if (name === "IdEspacoCultural") {
      setEvento({ ...evento, IdEspaco: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      await axios.put(`http://localhost:3000/evento/${id}`, {
        Nome: evento.Nome,
        Descricao: evento.Descricao,
        HorarioInicial: evento.HorarioInicial,
        HorarioFinal: evento.HorarioFinal,
        Valor: evento.Valor,
        Publico: evento.Publico,
        PublicoTotal: evento.PublicoTotal,
        Ativo: evento.Ativo,
        IdEspaco: evento.IdEspaco,
        IdCategoria: evento.IdCategoria
      });
      setError(null);
      setSuccessMessage("Evento atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar evento");
    }
  };

  const handleVoltar = () => {
    navigate("/buscarevento");
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
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <FestivalIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Atualizar Evento
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, width: "50%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="off"
              value={evento.Nome}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="HorarioInicial"
              label="Horário Inicial"
              name="HorarioInicial"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formatDateForInput(evento.HorarioInicial)}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="HorarioFinal"
              label="Horário Final"
              name="HorarioFinal"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formatDateForInput(evento.HorarioFinal)}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Valor"
              label="Valor"
              name="Valor"
              type="number"
              autoComplete="off"
              value={evento.Valor}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Publico"
              label="Público"
              name="Publico"
              type="number"
              autoComplete="off"
              value={evento.Publico}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="PublicoTotal"
              label="Público Total"
              name="PublicoTotal"
              type="number"
              autoComplete="off"
              value={evento.PublicoTotal}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="Descricao"
                name="Descricao"
                label="Descrição"
                multiline
                minRows={3}
                placeholder="Descrição do evento"
                value={evento.Descricao}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="espacoCultural-label">Espaço Cultural</InputLabel>
              <Select
                labelId="espacoCultural-label"
                id="IdEspacoCultural"
                name="IdEspacoCultural"
                value={evento.IdEspacoCultural}
                onChange={handleChange}
                label="Espaço Cultural"
              >
                {espacosCulturais.map((espacoCultural) => (
                  <MenuItem key={espacoCultural.IdEspacoCultural} value={espacoCultural.IdEspacoCultural}>
                    {espacoCultural.Nome}
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
                value={evento.IdEspaco}
                onChange={handleChange}
                label="Espaço"
              >
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
                    value={evento.IdCategoria} // Garante que o MenuItem correto seja selecionado
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
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Ativo</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={evento.Ativo}
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
                mt: 2,
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
                onClick={handleVoltar}
                sx={{ width: 150 }}
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

const formatDateForInput = (dateTimeString) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // Month is zero indexed
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default UpdateEvento;
