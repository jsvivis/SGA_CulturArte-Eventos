// BIBLIOTECAS
import React from "react";
import { Link as RouterLink } from "react-router-dom";

// FRAMEWORKS - MATERIAL UI
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Paper,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: { secondary: {
    main: '#00695f',
  },
},
});

export default function Manager() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 1,
            marginbutton: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom:'30px'
          }}
        >
          <Typography component="h1" variant="h3" gutterBottom fontFamily='signika'>
            <b>Gerenciador</b>
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom fontFamily='signika'>
                  Eventos
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarevento"
                    variant="contained"
                    color="secondary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarevento"
                    variant="contained"
                    color="secondary"
                  >
                    Pesquisar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/gerenciarevento"
                    variant="contained"
                    color="secondary"
                  >
                    Gerenciar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom fontFamily='signika'>
                  Usuário
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarusuario"
                    variant="contained"
                    color="secondary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarusuario"
                    variant="contained"
                    color="secondary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom fontFamily='signika'>
                  Espaço Cultural
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarespacocultural"
                    variant="contained"
                    color="secondary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarespacocultural"
                    variant="contained"
                    color="secondary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom fontFamily='signika'>
                  Espaço
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarespaco"
                    variant="contained"
                    color="secondary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarespaco"
                    variant="contained"
                    color="secondary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom fontFamily='signika'>
                  Categoria
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarcategoria"
                    variant="contained"
                    color="secondary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarcategoria"
                    variant="contained"
                    color="secondary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

           <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom fontFamily='signika'>
                  Reação
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarreacao"
                    variant="contained"
                    color="secondary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarreacao"
                    variant="contained"
                    color="secondary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
