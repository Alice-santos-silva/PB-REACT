import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #700052',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh', 
  overflowY: 'auto', 
};

const LoginModal = ({ open, handleClose, setUserRole }) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [colabEmail, setColabEmail] = useState('');
  const [colabPassword, setColabPassword] = useState('');
  const [error, setError] = useState('');
  const [colaboradorCreds, setColaboradorCreds] = useState(null); 
  const [showCreateInputs, setShowCreateInputs] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      setUserRole('admin');
      alert('Login realizado com sucesso como Administrador');
      handleClose();
    } catch (error) {
      setError('Erro ao fazer login: ' + error.message);
    }
  };

  const handleColabLogin = (e) => {
    e.preventDefault();
    setError('');
  
    const storedColaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
  
    const colaborador = storedColaboradores.find(
      (colab) => colab.email === colabEmail && colab.password === colabPassword
    );
  
    if (colaborador) {
      setUserRole('colaborador'); 
      alert('Login realizado com sucesso como Colaborador');
      handleClose();
    } else {
      setError('Credenciais de colaborador inválidas.');
    }
  };

  const handleCreateColaborador = () => {
    if (newEmail && newPassword) {
      const newColaborador = { email: newEmail, password: newPassword };
      
      const storedColaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
  
      const updatedColaboradores = [...storedColaboradores, newColaborador];
  
      localStorage.setItem('colaboradores', JSON.stringify(updatedColaboradores));
  
      setColaboradorCreds(updatedColaboradores);
  
      alert('Conta de colaborador criada com sucesso!');
      setNewEmail('');
      setNewPassword('');
      setShowCreateInputs(false);
    } else {
      setError('Preencha o email e senha para criar uma conta.');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: 'center', color: 'black' }}
        >
          Login Administrador
        </Typography>
        <form onSubmit={handleAdminLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="admin-email"
            label="Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="admin-password"
            label="Senha"
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#700052', color: '#fff' }}
          >
            Entrar como Admin
          </Button>
        </form>

        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: 'center', color: 'black', mt: 3 }}
        >
          Login Colaborador
        </Typography>
        <form onSubmit={handleColabLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="colab-email"
            label="Email"
            value={colabEmail}
            onChange={(e) => setColabEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="colab-password"
            label="Senha"
            type="password"
            value={colabPassword}
            onChange={(e) => setColabPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#700052', color: '#fff' }}
          >
            Entrar como Colaborador
          </Button>
        </form>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, borderColor: '#700052', color: '#700052' }}
          onClick={() => setShowCreateInputs(!showCreateInputs)}
        >
          {showCreateInputs ? 'Cancelar' : 'Criar Conta de Colaborador'}
        </Button>

        {showCreateInputs && (
          <Box sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-email"
              label="Novo Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="Nova Senha"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: '#700052', color: '#fff' }}
              onClick={handleCreateColaborador}
            >
              Confirmar Criação de Conta
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;
