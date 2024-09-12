import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "moment/locale/pt-BR";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Container,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  DialogActions,
  Snackbar,
  MenuItem,
  Grid,
} from '@mui/material';
import '../styles/bigCalendar.css';
import { Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const localizer = momentLocalizer(moment);

const theme = createTheme({
  palette: { secondary: {
    main: '#00695f',
  },
},
});

const BigCalendarComponent = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    IdEvento: '',
    Nome: '',
    Descricao: '',
    HorarioInicial: '',
    HorarioFinal: '',
    Valor: '',
    PublicoTotal: '',
    IdEspacoCultural: '',
    IdEspaco: '',
    IdCategoria: '',
  });
  const [espacosCulturais, setEspacosCulturais] = useState([]);
  const [espacos, setEspacos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedEspacoCultural, setSelectedEspacoCultural] = useState('');
  const [selectedEspaco, setSelectedEspaco] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filters, setFilters] = useState({
    culturalSpace: null,
    space: null,
    categories: [],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/evento');
        const activeEvents = response.data.filter(evento => evento.Ativo);
        const formattedEvents = activeEvents.map(evento => ({
          id: evento.IdEvento,
          title: evento.Nome,
          start: new Date(evento.HorarioInicial),
          end: new Date(evento.HorarioFinal),
          descricao: evento.Descricao,
          valor: evento.Valor,
          publicoTotal: evento.PublicoTotal,
          idEspacoCultural: evento.IdEspacoCultural,
          idEspaco: evento.IdEspaco,
          idCategoria: evento.IdCategoria,
          categoriaCor: evento.CorCategoria,
          ativo: evento.Ativo
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
  
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchEspacosCulturais = async () => {
      try {
        const response = await axios.get('http://localhost:3000/espacocultural');
        setEspacosCulturais(response.data);
      } catch (error) {
        console.error('Erro ao buscar espaços culturais:', error);
      }
    };

    fetchEspacosCulturais();
  }, []);

  useEffect(() => {
    const fetchEspacos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/espaco');
        setEspacos(response.data);
      } catch (error) {
        console.error('Erro ao buscar espaços culturais:', error);
      }
    };

    fetchEspacos();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categoria');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [selectedEspacoCultural, selectedEspaco, selectedCategoria]);

  const filterEvents = () => {
    let filtered = events;
  
    if (selectedEspacoCultural) {
      filtered = filtered.filter(event => event.idEspacoCultural === selectedEspacoCultural);
    }
  
    if (selectedEspaco) {
      filtered = filtered.filter(event => event.idEspaco === selectedEspaco);
    }
  
    if (selectedCategoria) {
      filtered = filtered.filter(event => event.idCategoria === selectedCategoria);
    }
  
    setFilteredEvents(filtered);
  };

  const formatDateTimeForInput = (dateTimeString) => {
    if (!dateTimeString) {
      return ''; // Retorna uma string vazia se a data for nula
    }
    const dateObj = new Date(dateTimeString);
    return dateObj.toISOString().slice(0, 16); // Formato 'yyyy-MM-ddThh:mm'
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'IdEspacoCultural') {
      fetchEspacos(value);
    }
  };

  const handleEspacoCulturalChange = (event) => {
    const value = event.target.value;
    setSelectedEspacoCultural(value);
    fetchEspacos(value);
    setSelectedEspaco('');
  };

  const handleEspacoChange = (event) => {
    setSelectedEspaco(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate); 
  };


 const fetchEspacos = async (idEspacoCultural) => {
  try {
    const response = await axios.get(`http://localhost:3000/espaco/${idEspacoCultural}`);
    setEspacos(response.data);
  } catch (error) {
    console.error('Erro ao buscar espaços:', error);
  }
};

  const handleSelectSlot = ({ start, end }) => {
    setCurrentEvent(null); // Reset currentEvent for adding new event
    setFormData({
      IdEvento: '',
      Nome: '',
      Descricao: '',
      HorarioInicial: formatDateTimeForInput(start),
      HorarioFinal: formatDateTimeForInput(end),
      Valor: '',
      PublicoTotal: '',
      IdEspacoCultural: '',
      IdEspaco: '',
      IdCategoria: '',
    });
    setOpen(true);
  };

  const messages = {
date: 'Data',
time: 'Hora',
event: 'Evento',
allDay: 'Dia inteiro',
week: 'Semana',
work_week: 'Semana de trabalho',
day: 'Dia',
month: 'Mês',
previous: 'Anterior',
next: 'Próximo',
yesterday: 'Ontem',
tomorrow: 'Amanhã',
today: 'Hoje',
agenda: 'Agenda',
noEventsInRange: 'Não há eventos neste intervalo.',
showMore: total => `+${total} mais`,
};


  const handleSelectEvent = async (event) => {
    setCurrentEvent(event);
    try {
      const response = await axios.get(`http://localhost:3000/evento/${event.IdEvento}`);
      const eventData = response.data;

      setFormData({
        IdEvento: eventData.IdEvento || '',
        Nome: eventData.Nome || '',
        Descricao: eventData.Descricao || '',
        HorarioInicial: formatDateTimeForInput(eventData.HorarioInicial),
        HorarioFinal: formatDateTimeForInput(eventData.HorarioFinal),
        Valor: eventData.Valor || '',
        PublicoTotal: eventData.PublicoTotal || '',
        IdEspacoCultural: eventData.IdEspacoCultural || '',
        IdEspaco: eventData.IdEspaco || '',
        IdCategoria: eventData.IdCategoria || '',
      });

      // Busca os espaços culturais e espaços baseado no IdEspacoCultural
      fetchEspacos(eventData.IdEspacoCultural);
    } catch (error) {
      console.error('Erro ao buscar evento para edição:', error);
      // Se ocorrer erro, preencha o formulário com os dados do evento selecionado
      setFormData({
        IdEvento: event.id,
        Nome: event.title,
        Descricao: event.descricao,
        HorarioInicial: formatDateTimeForInput(event.start),
        HorarioFinal: formatDateTimeForInput(event.end),
        Valor: event.valor,
        PublicoTotal: event.publicoTotal,
        IdEspacoCultural: event.idEspacoCultural,
        IdEspaco: event.idEspaco,
        IdCategoria: event.idCategoria,
      });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEvent(null);
    setFormData({
      IdEvento: '',
      Nome: '',
      Descricao: '',
      HorarioInicial: '',
      HorarioFinal: '',
      Valor: '',
      PublicoTotal: '',
      IdEspacoCultural: '',
      IdEspaco: '',
      IdCategoria: '',
    });
    window.location.reload();
  };

  const handleSave = async () => {
    // Converte os horários para objetos Date para comparação
    const startTime = new Date(formData.HorarioInicial);
    const endTime = new Date(formData.HorarioFinal);
  
    // Verifica se o horário final é menor que o horário inicial
    if (endTime <= startTime) {
      setErrorMessage('O horário final deve ser maior que o horário inicial.');
      setSuccessMessage('');
      return; // Sai da função se a validação falhar
    }
  
    try {
      let response;
      if (currentEvent) {
        response = await axios.put(`http://localhost:3000/evento/${currentEvent.id}`, formData);
      } else {
        response = await axios.post('http://localhost:3000/evento', formData);
      }
      setSuccessMessage('Evento salvo com sucesso!');
      setErrorMessage('');
  
      const newEvent = {
        id: response.data.IdEvento,
        title: response.data.Nome,
        start: new Date(response.data.HorarioInicial),
        end: new Date(response.data.HorarioFinal),
        descricao: response.data.Descricao,
        valor: response.data.Valor,
        publicoTotal: response.data.PublicoTotal,
        idEspacoCultural: response.data.IdEspacoCultural,
        idEspaco: response.data.IdEspaco,
        idCategoria: response.data.IdCategoria,
        categoriaCor: response.data.CorCategoria,
      };
  
      if (currentEvent) {
        setEvents(events.map(event => (event.id === currentEvent.id ? newEvent : event)));
      } else {
        setEvents([...events, newEvent]);
      }
  
      filterEvents(); // Certifique-se de chamar a função de filtro após atualizar os eventos
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      setErrorMessage('Erro ao salvar evento. Tente novamente.');
      setSuccessMessage('');
    }
  };
  return (
    <Container maxWidth={false}> 
      <CssBaseline />
      <Box sx={{ mt: 3, width: '100%', }}>
        <Box sx={{ height: 715, mt: 3 }}>
        <BigCalendar
        defaultDate={currentDate}
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={['day', 'week', 'month']}
          selectable
          step={15} // Intervalo de minutos entre os slots de tempo
          timeslots={4} 
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.categoriaCor || '#00695f', // Cor padrão
            },
          })}
          style={{ height: '100%', width: '100%' }}
          messages={messages}

        />
        </Box>
      </Box>
      <Box sx={{ mt: 3, paddingBottom:'50px'}}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="espacoCultural-select-label">Espaço Cultural</InputLabel>
              <Select
                labelId="espacoCultural-select-label"
                id="espacoCultural-select"
                value={selectedEspacoCultural}
                label="Espaço Cultural"
                onChange={handleEspacoCulturalChange}
              >
                <MenuItem value="">
                    <em>Todos</em>
                  </MenuItem>
                  {espacosCulturais.filter(espacoCultural => espacoCultural.Ativo).map((espacoCultural) => (
                    <MenuItem key={espacoCultural.IdEspacoCultural} value={espacoCultural.IdEspacoCultural}>
                      {espacoCultural.Nome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="espaco-select-label">Espaço</InputLabel>
              <Select
                labelId="espaco-select-label"
                id="espaco-select"
                value={selectedEspaco}
                label="Espaço"
                onChange={handleEspacoChange}
                disabled={!selectedEspacoCultural}
              >
                <MenuItem value="">
                    <em>Todos</em>
                  </MenuItem>
                  {espacos.filter(espaco => espaco.Ativo).map((espaco) => (
                    <MenuItem key={espaco.IdEspaco} value={espaco.IdEspaco}>
                      {espaco.Nome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="categoria-select-label">Categoria</InputLabel>
            <Select
              labelId="categoria-select-label"
              id="categoria-select"
              label="Categoria"
              value={selectedCategoria}
              onChange={handleCategoriaChange}
              renderValue={(selected) => {
                const selectedCategoria = categorias.find(categoria => categoria.IdCategoria === selected);
                return (
                  <Box display="flex" alignItems="center">
                    <Box
                      component="span"
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: selectedCategoria ? selectedCategoria.Cor : 'transparent',
                        borderRadius: '50%',
                        marginRight: 1
                      }}
                    />
                    {selectedCategoria ? selectedCategoria.Nome : ''}
                  </Box>
                );
              }}
            >
              <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {categorias.filter(categoria => categoria.Ativo).map((categoria) => (
                  <MenuItem key={categoria.IdCategoria} value={categoria.IdCategoria}>
                    <Box display="flex" alignItems="center">
                      <Box
                        component="span"
                        sx={{
                          width: 16,
                          height: 16,
                          backgroundColor: categoria.Cor,
                          borderRadius: '50%',
                          marginRight: 1,
                        }}
                      />
                      {categoria.Nome}
                    </Box>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentEvent ? 'Editar Evento' : 'Adicionar Evento'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Preencha as informações do evento.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            name="Nome"
            label="Nome"
            type="text"
            fullWidth
            value={formData.Nome}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="descricao"
            name="Descricao"
            label="Descrição"
            type="text"
            fullWidth
            value={formData.Descricao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="horarioInicial"
            name="HorarioInicial"
            label="Horário Inicial"
            type="datetime-local"
            fullWidth
            value={formData.HorarioInicial}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="horarioFinal"
            name="HorarioFinal"
            label="Horário Final"
            type="datetime-local"
            fullWidth
            value={formData.HorarioFinal}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="valor"
            name="Valor"
            label="Valor"
            type="number"
            fullWidth
            value={formData.Valor}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="publicoTotal"
            name="PublicoTotal"
            label="Público Total"
            type="number"
            fullWidth
            value={formData.PublicoTotal}
            onChange={handleChange}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="espacoCultural-select-dialog-label">Espaço Cultural</InputLabel>
            <Select
              labelId="espacoCultural-select-dialog-label"
              id="espacoCultural-select-dialog"
              name="IdEspacoCultural"
              label="Espaço Cultural"
              value={formData.IdEspacoCultural}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Selecione um espaço cultural</em>
              </MenuItem>
              {espacosCulturais.map((espacoCultural) => (
                <MenuItem key={espacoCultural.IdEspacoCultural} value={espacoCultural.IdEspacoCultural}>
                  {espacoCultural.Nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="espaco-select-dialog-label">Espaço</InputLabel>
            <Select
              labelId="espaco-select-dialog-label"
              id="espaco-select-dialog"
              name="IdEspaco"
              label="Espaço"
              value={formData.IdEspaco}
              onChange={handleChange}
              disabled={!formData.IdEspacoCultural}
            >
              <MenuItem value="">
                <em>Selecione um espaço</em>
              </MenuItem>
              {espacos.map((espaco) => (
                <MenuItem key={espaco.IdEspaco} value={espaco.IdEspaco}>
                  {espaco.Nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="categoria-select-dialog-label">Categoria</InputLabel>
              <Select
                labelId="categoria-select-dialog-label"
                id="categoria-select-dialog"
                name="IdCategoria"
                label="Categoria"
                value={formData.IdCategoria}
                onChange={handleChange}
                renderValue={(selected) => {
                  const selectedCategoria = categorias.find(categoria => categoria.IdCategoria === selected);
                  return (
                    <Box display="flex" alignItems="center">
                      <Box
                        component="span"
                        sx={{
                          width: 16,
                          height: 16,
                          backgroundColor: selectedCategoria ? selectedCategoria.Cor : 'transparent',
                          borderRadius: '50%',
                          marginRight: 1,
                        }}
                      />
                      {selectedCategoria ? selectedCategoria.Nome : ''}
                    </Box>
                  );
                }}
              >
                <MenuItem value="">
                  <em>Selecione uma categoria</em>
                </MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.IdCategoria} value={categoria.IdCategoria}>
                    <Box display="flex" alignItems="center">
                      <Box
                        component="span"
                        sx={{
                          width: 16,
                          height: 16,
                          backgroundColor: categoria.Cor,
                          borderRadius: '50%',
                          marginRight: 1,
                        }}
                      />
                      {categoria.Nome}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="secondary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BigCalendarComponent;
