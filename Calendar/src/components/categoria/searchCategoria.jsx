import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Alert,
  FormControlLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function SearchCategoria() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [filterAtivo, setFilterAtivo] = useState(true);

  useEffect(() => {
    fetchCategorias();
  }, [filterAtivo]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categoria");
      const filteredCategorias = filterAtivo ? response.data.filter(categoria => categoria.Ativo) : response.data;
      setCategorias(filteredCategorias);
      setError(null);
    } catch (error) {
      console.error(error);
      setCategorias([]);
      setError("Erro ao carregar categorias.");
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterAtivo(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/categoriasearch/${searchTerm}`);
      const filteredCategorias = filterAtivo ? response.data.filter(categoria => categoria.Ativo) : response.data;
      setCategorias(filteredCategorias);
      setError(null);
    } catch (error) {
      console.error(error);
      setCategorias([]);
      setError("Nenhuma categoria encontrada.");
    }
  };

  const handleVoltar = () => {
    navigate("/manager"); // Navegar de volta para a página
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
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
            Pesquisar Categoria
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%", maxWidth: 600, margin: "0 auto" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchTerm"
              label="Pesquisar Categoria"
              name="searchTerm"
              autoComplete="off"
              value={searchTerm}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterAtivo}
                  onChange={handleFilterChange}
                  color="primary"
                />
              }
              label="Mostrar apenas categorias ativas"
              sx={{ mt: 2 ,  display: 'flex', justifyContent: 'center' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150 }}
              >
                Buscar
              </Button>
            </Box>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          {categorias.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 3, width: "100%", maxWidth: 800, border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Cor</TableCell>
                    <TableCell>Ativo</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorias.map((categoria) => (
                    <TableRow key={categoria.IdCategoria}>
                      <TableCell>{categoria.IdCategoria}</TableCell>
                      <TableCell>{categoria.Nome}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            backgroundColor: categoria.Cor,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: 1,
                          }}
                        />
                        {categoria.Cor}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={categoria.Ativo}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          to={`/atualizarcategoria/${categoria.IdCategoria}`}
                          variant="contained"
                          color="warning"
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
      </Container>
    </ThemeProvider>
  );
}

export default SearchCategoria;
