import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
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
  Avatar,
  FormControlLabel,
} from "@mui/material";
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from '@mui/material/Alert';

const theme = createTheme();

function SearchReacao() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [reacoes, setReacoes] = useState([]);
  const [error, setError] = useState(null);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  useEffect(() => {
    const fetchReacoes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reacao");
        const filteredReacoes = response.data.filter(reacao => reacao.Ativo || !showActiveOnly);
        setReacoes(filteredReacoes);
        setError(null);
      } catch (error) {
        console.error(error);
        setReacoes([]);
        setError("Erro ao carregar reações");
      }
    };

    fetchReacoes();
  }, [showActiveOnly]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setShowActiveOnly(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/reacaosearch/${searchTerm}`);
      const filteredReacoes = response.data.filter(reacao => reacao.Ativo || !showActiveOnly);
      setReacoes(filteredReacoes);
      setError(null);
    } catch (error) {
      console.error(error);
      setReacoes([]);
      setError("Nenhuma reação encontrada");
    }
  };

  const handleVoltar = () => {
    navigate("/manager"); // Navegar de volta para a página
  };

  // Função para converter o código Unicode em emoji
  const getEmojiFromCode = (unicode) => {
    return String.fromCodePoint(parseInt(unicode, 16));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
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
            <RecommendOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Pesquisar Reação
          </Typography>
          <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 3,
                width: '100%',
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="searchTerm"
                  label="Pesquisar Reação"
                  name="searchTerm"
                  autoComplete="searchTerm"
                  autoFocus
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  sx={{ maxWidth: 'calc(100% - 120px)' }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showActiveOnly}
                      onChange={handleCheckboxChange}
                      name="showActiveOnly"
                      color="primary"
                    />
                  }
                  label="Mostrar apenas reações ativas"
                  sx={{ display: 'flex', alignItems: 'center' }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {reacoes.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 3, width: '100%', maxHeight: 400, overflow: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Emoticon</TableCell>
                    <TableCell>Ativo</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reacoes.map((reacao) => (
                    <TableRow key={reacao.IdReacao}>
                      <TableCell>{reacao.IdReacao}</TableCell>
                      <TableCell>{reacao.Nome}</TableCell>
                      <TableCell>{getEmojiFromCode(reacao.Emoticon)}</TableCell> {/* Converter o código em emoji */}
                      <TableCell>
                        <Checkbox
                          checked={reacao.Ativo}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          component={Link}
                          to={`/atualizarreacao/${reacao.IdReacao}`}
                          variant="contained"
                          color="warning"
                          size="small" // Tamanho pequeno para o botão
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
              sx={{ width: 150 }} // Botão de voltar menor
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

export default SearchReacao;
