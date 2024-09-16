import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
      primary: {
        main: '#700052', 
      },
    },
  });

const AcessoNegado = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" sx={{ color: 'red', mb: 3 }}>
        Acesso Negado
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Você não tem permissão para acessar esta página.
      </Typography>
      <ThemeProvider theme={theme}>
        <Button variant="contained"  onClick={() => navigate('/')}>
            Voltar para a página inicial
        </Button>
      </ThemeProvider>
      
    </Box>
  );
};

export default AcessoNegado;
