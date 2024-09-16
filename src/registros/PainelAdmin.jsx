import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

const PainelAdmin = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [bloqueados, setBloqueados] = useState([]);

  
  useEffect(() => {
    const savedColaboradores = localStorage.getItem('colaboradores');
    const savedBloqueados = localStorage.getItem('bloqueados');
    if (savedColaboradores) {
      setColaboradores(JSON.parse(savedColaboradores));
    }
    if (savedBloqueados) {
      setBloqueados(JSON.parse(savedBloqueados));
    }
  }, []);

  const handleDeleteColaborador = (email) => {
    const updatedColaboradores = colaboradores.filter((c) => c.email !== email);
    setColaboradores(updatedColaboradores);
    localStorage.setItem('colaboradores', JSON.stringify(updatedColaboradores)); 
  };

  const handleBlockColaborador = (email) => {
    const colaboradorToBlock = colaboradores.find((c) => c.email === email);
    if (colaboradorToBlock) {
      
      const updatedColaboradores = colaboradores.filter((c) => c.email !== email);
      setColaboradores(updatedColaboradores);
      setBloqueados([...bloqueados, colaboradorToBlock]);

    
      localStorage.setItem('colaboradores', JSON.stringify(updatedColaboradores));
      localStorage.setItem('bloqueados', JSON.stringify([...bloqueados, colaboradorToBlock]));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Painel Administrativo
      </Typography>

      
      <Typography variant="h6" gutterBottom>
        Colaboradores Ativos
      </Typography>
      <List>
        {colaboradores.length === 0 ? (
          <Typography>Nenhum colaborador cadastrado.</Typography>
        ) : (
          colaboradores.map((colaborador, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteColaborador(colaborador.email)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="block" onClick={() => handleBlockColaborador(colaborador.email)}>
                    <BlockIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={colaborador.email} />
            </ListItem>
          ))
        )}
      </List>

     
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Colaboradores Bloqueados
      </Typography>
      <List>
        {bloqueados.length === 0 ? (
          <Typography>Nenhum colaborador bloqueado.</Typography>
        ) : (
          bloqueados.map((colaborador, index) => (
            <ListItem key={index}>
              <ListItemText primary={colaborador.email} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default PainelAdmin;
