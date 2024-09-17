import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LoginModal from './LoginModal'; 


const theme = createTheme({
  palette: {
    primary: {
      main: '#700052', 
    },
  },
});

export default function ButtonAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sistema de Compras
            </Typography>
            <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={menuOpen} onClose={toggleMenu} PaperProps={{
            sx: { backgroundColor: '#700052', color: '#fff' }, 
          }}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Início" />
            </ListItem>
            <ListItem button component={Link} to="/painel-admin">
              <ListItemText primary="Painel do Administrador" />
            </ListItem>
            <ListItem button component={Link} to="/criar-admin">
              <ListItemText primary="Nova Conta de Admin" />
            </ListItem>
            <ListItem button component={Link} to="/criar-req">
              <ListItemText primary="Criar Requisição" />
            </ListItem>
            <ListItem button component={Link} to="/alterar-req">
              <ListItemText primary="Alterar Requisição" />
            </ListItem>
            <ListItem button component={Link} to="/cadastro-fornecedor">
              <ListItemText primary="Cadastro de Fornecedores" />
            </ListItem>
            <ListItem button component={Link} to="/cadastro-contato">
              <ListItemText primary="Cadastro de Contatos" />
            </ListItem>
            <ListItem button component={Link} to="/cadastro-produto">
              <ListItemText primary="Cadastro de Produtos" />
            </ListItem>
            <ListItem button component={Link} to="/cadastro-cotacao">
              <ListItemText primary="Cadastro de Cotações" />
            </ListItem>
            <ListItem button component={Link} to="/consulta-cotacoes">
              <ListItemText primary="Consulta de cotações" />
            </ListItem>
            <ListItem button component={Link} to="/consulta-dolar">
              <ListItemText primary="Cotação do Dólar" />
            </ListItem>
          </List>
        </Drawer>
        <LoginModal open={loginOpen} handleClose={handleLoginClose} />
      </Box>
    </ThemeProvider>
  );
}
