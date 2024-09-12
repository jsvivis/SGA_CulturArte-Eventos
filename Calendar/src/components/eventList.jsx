import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/evento')
      .then(response => {
        const currentDateTime = new Date();
        // Filtrando os eventos para excluir eventos passados e ordenando por HorarioInicial
        const filteredAndSortedEvents = response.data
          .filter(event => new Date(event.HorarioInicial) >= currentDateTime)
          .sort((a, b) => new Date(a.HorarioInicial) - new Date(b.HorarioInicial));
        setEvents(filteredAndSortedEvents);
      })
      .catch(error => {
        console.error('Erro ao carregar eventos:', error);
      });
  }, []);

  const formatDateTime = (dateTimeString) => {
    try {
      return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateTimeString;
    }
  };
  return (
    <Paper elevation={3} sx={{p: 2, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h6" component="h2" fontFamily='Signika'>
        <b>Próximos Eventos</b>
      </Typography>
      <Box sx={{ width: '100%', maxHeight: '300px', overflowY: 'auto', mt: 2 }}>
      <List>
      {events.map(event => (
            <ListItem key={event.IdEvento}>
              <ListItemText
                primary={event.Nome}
                secondary={
                  <>
                    {formatDateTime(event.HorarioInicial)}
                    <Typography variant="body2" color="textSecondary">
                      {event.NomeEspacoCultural} - {event.NomeEspaco}
                    </Typography>
                  </>
                }
              />
            </ListItem>
        ))}
      </List>
      </Box>
    </Paper>
  );
}
