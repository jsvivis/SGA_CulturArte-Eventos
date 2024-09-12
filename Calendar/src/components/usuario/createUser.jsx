// BIBLIOTECAS
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from 'bcryptjs';

// FRAMEWORKS - MATERIAL UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const theme = createTheme();

function CreateUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //encriptar a senha antes do envio
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(formData.senha, salt);
            const response = await axios.post('http://localhost:3000/usuario', { ...formData, senha: hashedPassword });
            console.log(response.data);
            setFormData({
                nome: "",
                email: "",
                senha: ""
            });
            setErrorMessage(""); // Limpa mensagem de erro se houver
            setSuccessMessage("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao cadastrar usuário");
            setSuccessMessage(""); // Limpa mensagem de sucesso se houver
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro de Usuário
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            autoComplete="nome"
                            autoFocus
                            value={formData.nome}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="senha"
                            label="Senha"
                            type="password"
                            id="senha"
                            autoComplete="current-password"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                                mt: 3,
                                mb: 2
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
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                        {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateUser;
