import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PainelAdmin = () => {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    
    const savedColaboradores = localStorage.getItem('colaboradores');
    if (savedColaboradores) {
      setColaboradores(JSON.parse(savedColaboradores));
    }
  }, []);

  const handleDeleteColaborador = (email) => {
    const updatedColaboradores = colaboradores.filter((c) => c.email !== email);
    setColaboradores(updatedColaboradores);
    localStorage.setItem('colaboradores', JSON.stringify(updatedColaboradores)); 
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Painel Administrativo
      </Typography>
      <List>
        {colaboradores.length === 0 ? (
          <Typography>Nenhum colaborador cadastrado.</Typography>
        ) : (
          colaboradores.map((colaborador, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteColaborador(colaborador.email)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={colaborador.email} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default PainelAdmin;