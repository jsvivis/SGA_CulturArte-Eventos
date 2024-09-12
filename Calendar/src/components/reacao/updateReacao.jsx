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
  CircularProgress,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Popover from "@mui/material/Popover";
import ButtonGroup from "@mui/material/ButtonGroup";

const theme = createTheme();

function UpdateReacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Nome: "",
    Emoticon: "",
    Ativo: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar a abertura do seletor de emoticons

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reacao/${id}`);
        const userData = response.data[0]; // Acessa o primeiro objeto no array
  
        // Convertendo o código do emoji para o emoji visível
        const emoticonEmoji = String.fromCodePoint(parseInt(userData.Emoticon, 16));
  
        setUser({
          Nome: userData.Nome,
          Emoticon: emoticonEmoji,
          Ativo: userData.Ativo,
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
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Convertendo o emoji visível para o código de emoji
      const emoticonCode = user.Emoticon.codePointAt(0).toString(16).toUpperCase();

      // Atualizando o objeto do usuário com o código de emoji
      const updatedUser = {
        ...user,
        Emoticon: emoticonCode,
      };

      await axios.put(`http://localhost:3000/reacao/${id}`, updatedUser);
      setError(null);
      setMessage("Emoticon atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar usuário");
    }
  };

  const handleVoltar = () => {
    navigate("/buscarreacao"); // Navegar de volta para a página
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? "emoticon-popover" : undefined;

  const emoticons = ["😊", "😄", "😍", "😂","🤩","🙁", "😡", "👍", "👏"]; // Exemplo de emoticons disponíveis

  const handleEmoticonSelect = (emoticon) => {
    setUser({ ...user, Emoticon: emoticon });
    setAnchorEl(null); // Fechar o seletor de emoticons após seleção
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
            <RecommendOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Atualizar Reação
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 400 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="nome"
              autoFocus
              value={user.Nome || ""}
              onChange={handleChange}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <Typography variant="body1">Selecione um emoticon:</Typography>
              {user.Emoticon && (
                <Typography variant="body1">{user.Emoticon}</Typography>
              )}
              <Button
                aria-describedby={idPopover}
                variant="contained"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <EmojiEmotionsIcon />
              </Button>
              <Popover
                id={idPopover}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <ButtonGroup variant="contained">
                    {emoticons.map((emoticon, index) => (
                      <Button
                        key={index}
                        onClick={() => handleEmoticonSelect(emoticon)}
                      >
                        {emoticon}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>
              </Popover>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.Ativo}
                  onChange={handleChange}
                  name="Ativo"
                />
              }
              label="Ativo"
              sx={{ mt: 1 }} // Ajuste de espaçamento superior
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                mb: 3,
              }}
            >
              <Button type="submit" variant="contained" sx={{ width: 150 }}>
                Salvar
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                mb: 2,
              }}
            >
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

export default UpdateReacao;
