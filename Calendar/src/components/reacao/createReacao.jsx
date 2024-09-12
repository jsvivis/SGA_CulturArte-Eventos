import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// FRAMEWORKS - MATERIAL UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const theme = createTheme();

function CreateReacao() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Nome: "",
        Emoticon: "", // Adicionar um campo para armazenar o código do emoticon
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar a abertura do seletor de emoticons

    const emoticons = ["😊", "😄", "😍", "😂","🤩","🙁", "😡", "👍", "👏"]; // Exemplo de emoticons disponíveis

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmoticonSelect = (emoticon) => {
        // Obter o código Unicode do emoji selecionado
        const emojiCode = emoticon.codePointAt(0).toString(16).toUpperCase();
        setFormData({ ...formData, Emoticon: emojiCode }); // Armazenar o código Unicode
        setAnchorEl(null); // Fechar o seletor de emoticons após seleção
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/reacao', formData);
            console.log(response.data);
            setFormData({
                Nome: "",
                Emoticon: ""
            });
            setErrorMessage(""); // Limpar mensagem de erro se houver
            setSuccessMessage("Reação cadastrada com sucesso!");
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao cadastrar reação.");
            setSuccessMessage(""); // Limpar mensagem de sucesso se houver
        }
    };

    const handleVoltar = () => {
        navigate("/manager"); // Navegar de volta para a página
    };

    const open = Boolean(anchorEl);
    const id = open ? 'emoticon-popover' : undefined;

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
                        <RecommendOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro de Reação
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Nome"
                            label="Nome"
                            name="Nome"
                            autoComplete="Nome"
                            autoFocus
                            value={formData.Nome}
                            onChange={handleChange}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body1">Selecione um emoticon:</Typography>
                            {formData.Emoticon && (
                                <Typography variant="body1">{String.fromCodePoint(parseInt(formData.Emoticon, 16))}</Typography>
                            )}
                            <Button
                                aria-describedby={id}
                                variant="contained"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                                <EmojiEmotionsIcon />
                            </Button>
                        </Box>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box sx={{ p: 2 }}>
                                {emoticons.map((emoticon, index) => (
                                    <Button key={index} onClick={() => handleEmoticonSelect(emoticon)}>
                                        {emoticon}
                                    </Button>
                                ))}
                            </Box>
                        </Popover>
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

export default CreateReacao;
