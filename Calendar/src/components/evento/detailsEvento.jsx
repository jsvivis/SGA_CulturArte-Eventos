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
  Typography,
  Alert,
  Chip,
  TextField,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme();

function DetailsEvento() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [evento, setEvento] = useState({
    Nome: "",
    EspacoCultural: "",
    Local: "",
    HorarioInicial: "",
    HorarioFinal: "",
    Links: [],
    Fotos: [],
    Arquivos: []
  });
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [newFoto, setNewFoto] = useState(null);
  const [newArquivo, setNewArquivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvento = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/evento/${id}`);
      const eventoData = response.data[0]; // Acessa o primeiro objeto no array
      setEvento({
        Nome: eventoData.Nome,
        EspacoCultural: eventoData.NomeEspacoCultural,
        Local: eventoData.NomeEspaco,
        HorarioInicial: eventoData.HorarioInicial,
        HorarioFinal: eventoData.HorarioFinal,
        Links: eventoData.Links || [],
        Fotos: eventoData.Fotos || [],
        Arquivos: eventoData.Arquivos || []
      });

      // Buscar os links associados ao evento
      const linksResponse = await axios.get(`http://localhost:3000/linkevento/${id}`);
      setLinks(linksResponse.data);

      setError(null);
    } catch (error) {
      setError("Erro ao carregar evento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvento();
  }, [id, loading]);

  const handleAddLink = async () => {
    if (newLink.trim() === "") return;
    try {
      const obj = { IdEvento: id, Link: newLink };
      const response = await axios.post(`http://localhost:3000/link/`, obj);
      const updatedLinks = [...links, response.data];
      setLinks(updatedLinks);
      setNewLink("");
    } catch (error) {
      setError("Erro ao adicionar link");
    }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      await axios.delete(`http://localhost:3000/link/${linkId}`);
      setLoading(true);
    } catch (error) {
      setError("Erro ao deletar link");
    }
  };

  const handleAddFoto = async () => {
    if (!newFoto) return;
    const formData = new FormData();
    formData.append("foto", newFoto);
    try {
      const response = await axios.post(`http://localhost:3000/evento/${id}/foto`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedFotos = [...evento.Fotos, response.data.path];
      setEvento({ ...evento, Fotos: updatedFotos });
      setNewFoto(null);
    } catch (error) {
      setError("Erro ao adicionar foto");
    }
  };

  const handleDeleteFoto = async (fotoIndex) => {
    try {
      const updatedFotos = [...evento.Fotos];
      updatedFotos.splice(fotoIndex, 1);
      await axios.put(`http://localhost:3000/evento/${id}`, { Fotos: updatedFotos });
      setEvento({ ...evento, Fotos: updatedFotos });
    } catch (error) {
      setError("Erro ao deletar foto");
    }
  };

  const handleAddArquivo = async () => {
    if (!newArquivo) return;
    const formData = new FormData();
    formData.append("arquivo", newArquivo);
    try {
      const response = await axios.post(`http://localhost:3000/arquivo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedArquivos = [...evento.Arquivos, response.data.path];
      setEvento({ ...evento, Arquivos: updatedArquivos });
      setNewArquivo(null);
    } catch (error) {
      setError("Erro ao adicionar arquivo");
    }
  };

  const handleDeleteArquivo = async (arquivoIndex) => {
    try {
      const updatedArquivos = [...evento.Arquivos];
      updatedArquivos.splice(arquivoIndex, 1);
      await axios.put(`http://localhost:3000/evento/${id}`, { Arquivos: updatedArquivos });
      setEvento({ ...evento, Arquivos: updatedArquivos });
    } catch (error) {
      setError("Erro ao deletar arquivo");
    }
  };

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2); // Month is zero indexed
    const year = date.getFullYear();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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
            Detalhes do Evento
          </Typography>
          <Box
            sx={{
              mt: 3,
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            <TextField
              label="Nome do Evento"
              value={evento.Nome}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Espaço Cultural"
              value={evento.EspacoCultural}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Local"
              value={evento.Local}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Horário Inicial"
              value={formatDate(evento.HorarioInicial)}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Horário Final"
              value={formatDate(evento.HorarioFinal)}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />

            <Box>
              <Typography variant="h6">Links:</Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <TextField
                  label="Novo Link"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddLink}
                  sx={{ height: '56px' }}
                >
                  <AddIcon />
                </Button>
              </Box>
              {links.map((link, index) => (
                <Chip
                  key={index}
                  label={link.Link}
                  onDelete={() => handleDeleteLink(link.IdLink)}
                  color="primary"
                  sx={{ mr: 1, mb: 1 }}
                  deleteIcon={<CloseIcon />}
                />
              ))}
                          </Box>

<Box>
  <Typography variant="h6">Imagens:</Typography>
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
    <Button
      variant="contained"
      component="label"
      color="primary"
      sx={{ height: '56px' }}
    >
      <AddIcon />
      <input
        type="file"
        hidden
        onChange={(e) => setNewFoto(e.target.files[0])}
      />
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddFoto}
      sx={{ height: '56px' }}
    >
      Adicionar
    </Button>
  </Box>
  {evento.Fotos.map((foto, index) => (
    <Chip
      key={index}
      label={foto}
      onDelete={() => handleDeleteFoto(index)}
      color="primary"
      sx={{ mr: 1, mb: 1 }}
      deleteIcon={<CloseIcon />}
    />
  ))}
</Box>

<Box>
  <Typography variant="h6">Arquivos:</Typography>
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
    <Button
      variant="contained"
      component="label"
      color="primary"
      sx={{ height: '56px' }}
    >
      <AddIcon />
      <input
        type="file"
        hidden
        onChange={(e) => setNewArquivo(e.target.files[0])}
      />
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddArquivo}
      sx={{ height: '56px' }}
    >
      Adicionar
    </Button>
  </Box>
  {evento.Arquivos.map((arquivo, index) => (
    <Chip
      key={index}
      label={arquivo}
      onDelete={() => handleDeleteArquivo(index)}
      color="primary"
      sx={{ mr: 1, mb: 1 }}
      deleteIcon={<CloseIcon />}
    />
  ))}
</Box>
<Button
  variant="contained"
  onClick={() => navigate("/buscarevento")}
  sx={{ width: 150 }}
>
  Voltar
</Button>
</Box>
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

export default DetailsEvento;

