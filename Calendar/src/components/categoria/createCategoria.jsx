import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function CreateCategoria() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nome: "",
    Cor: "#000000",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/categoria",
        formData
      );
      console.log(response.data);
      setSuccessMessage("Categoria criada com sucesso!");
      setErrorMessage(""); // Limpa mensagem de erro se houver
      setFormData({
        Nome: "",
        Cor: "#000000",
      });
    } catch (error) {
      console.error(error);
      setSuccessMessage(""); // Limpa mensagem de sucesso se houver
      setErrorMessage("Erro ao criar categoria.");
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
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <TheaterComedyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar Categoria
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
            <Box sx={{ mt: 3, width: "100%" }}>
              <label>Cor:</label>
              <input
                type="color"
                name="Cor"
                className="form-control"
                value={formData.Cor}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  height: "56px",
                  padding: "0",
                  border: "none",
                  borderRadius: "4px",
                  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 3,
                mb: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150 }}
              >
                Cadastrar
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

export default CreateCategoria;
