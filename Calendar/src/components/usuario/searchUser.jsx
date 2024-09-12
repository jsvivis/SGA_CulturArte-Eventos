import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const theme = createTheme();

function UserSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuario");
        const filteredUsers = response.data.filter(user => user.Ativo || !showActiveOnly);
        setUsers(filteredUsers);
        setError(null);
      } catch (error) {
        console.error(error);
        setUsers([]);
        setError("Erro ao carregar usuários");
      }
    };

    fetchUsers();
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
      const response = await axios.get(`http://localhost:3000/usuariosearch/${searchTerm}`);
      const filteredUsers = response.data.filter(user => user.Ativo || !showActiveOnly);
      setUsers(filteredUsers);
      setError(null);
    } catch (error) {
      console.error(error);
      setUsers([]);
      setError("Nenhum usuário encontrado");
    }
  };

  const handleVoltar = () => {
    navigate("/manager"); // Navegar de volta para a página
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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Pesquisa de Usuário
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchTerm"
              label="Pesquisar Usuário"
              name="searchTerm"
              autoComplete="searchTerm"
              autoFocus
              value={searchTerm}
              onChange={handleChange}
              placeholder="Digite o nome ou email do usuário"
              sx={{ maxWidth: 'calc(100% - 120px)', display: 'inline-block' }} // Ajuste de largura do campo de pesquisa
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showActiveOnly}
                  onChange={handleCheckboxChange}
                  name="showActiveOnly"
                  color="primary"
                />
              }
              label="Mostrar apenas usuários ativos"
              sx={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150 }} // Definindo largura mínima para o botão
              >
                Buscar
              </Button>
            </Box>
            {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
            {users.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 3, width: "100%", border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Ativo</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.IdUsuario}>
                        <TableCell>{user.IdUsuario}</TableCell>
                        <TableCell>{user.Nome}</TableCell>
                        <TableCell>{user.Email}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={user.Ativo}
                            readOnly
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            component={Link}
                            to={`/atualizarusuario/${user.IdUsuario}`}
                            variant="contained" color="warning"
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
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ width: 150}}
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

export default UserSearch;
