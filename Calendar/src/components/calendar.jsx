import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Paper, Typography } from '@mui/material';
import Calendar from 'react-calendar';

const MyCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom:'30px', color:'secondary'}}>
      <Typography variant="h6" component="h2" fontFamily='Signika'>
      <b>Calendário</b>
      </Typography>
      <Calendar
          onChange={handleDateChange}
          value={date}
          locale="pt-BR"  
      />
    </Paper>
  );
};

export default MyCalendar;

