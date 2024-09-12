// BIBLIOTECAS
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import cep from "cep-promise";

// FRAMEWORKS - MATERIAL UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const theme = createTheme();

function CreateEspacoCultural() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Nome: "",
        Cep: "",
        Endereco: "",
        Numero: "",
        Complemento: "",
        Cidade: "",
        Estado: "",
        Telefone: "",
        Email: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCepChange = async (event) => {
        const { value } = event.target;

        if (value.length === 8) {
            try {
                const endereco = await cep(value);
                setFormData({
                    ...formData,
                    Cep: value,
                    Endereco: endereco.street,
                    Complemento: endereco.complemento,
                    Cidade: endereco.city,
                    Estado: endereco.state
                });
            } catch (error) {
                console.error("Erro ao buscar CEP:", error.message);
            }
        } else {
            setFormData({
                ...formData,
                Cep: value,
                Endereco: "",
                Complemento: "",
                Cidade: "",
                Estado: ""
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post('http://localhost:3000/espacocultural', formData);
            console.log(response.data);
            setSuccessMessage("Espaço cultural criado com sucesso!");
            setErrorMessage("");
            setFormData({
                Nome: "",
                Cep: "",
                Endereco: "",
                Numero: "",
                Complemento: "",
                Cidade: "",
                Estado: "",
                Telefone: "",
                Email: ""
            });
        } catch (error) {
            console.error(error);
            setSuccessMessage("");
            setErrorMessage("Erro ao criar espaço cultural");
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
                        <MuseumOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastrar Espaço Cultural
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Nome"
                            label="Nome"
                            name="Nome"
                            autoComplete="nome"
                            autoFocus
                            value={formData.Nome}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Cep"
                            label="Cep"
                            name="Cep"
                            autoComplete="cep"
                            value={formData.Cep}
                            onChange={handleCepChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Endereco"
                            label="Endereço"
                            name="Endereco"
                            autoComplete="endereco"
                            value={formData.Endereco}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Numero"
                            label="Número"
                            name="Numero"
                            autoComplete="numero"
                            value={formData.Numero}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="Complemento"
                            label="Complemento"
                            name="Complemento"
                            autoComplete="complemento"
                            value={formData.Complemento}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Cidade"
                            label="Cidade"
                            name="Cidade"
                            autoComplete="cidade"
                            value={formData.Cidade}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Estado"
                            label="Estado"
                            name="Estado"
                            autoComplete="estado"
                            value={formData.Estado}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Telefone"
                            label="Telefone"
                            name="Telefone"
                            autoComplete="telefone"
                            value={formData.Telefone}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Email"
                            label="Email"
                            name="Email"
                            autoComplete="email"
                            value={formData.Email}
                            onChange={handleChange}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: 150 }}
                            >
                                Cadastrar
                            </Button>
                        </Box>
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
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateEspacoCultural;
