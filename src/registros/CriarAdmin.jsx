// src/registros/CriarAdmin.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../infra/firebase'; 

export default function CriarAdmin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCriarUsuario = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      setMensagem(`Usuário criado com sucesso: ${userCredential.user.email}`);
      setEmail('');
      setSenha('');
    } catch (error) {
      setMensagem(`Erro ao criar usuário: ${error.message}`);
    }
  };

  return (
    <div className="container03" >
        <div className='forms'>
        <h2>Criar Novo Admin</h2>
        <form onSubmit={handleCriarUsuario} >
            <div>
            <label>Email:</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{color:'black'}}
            />
            </div>
            <div>
            <label>Senha:</label>
            <input 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required 
                style={{color:'black'}}
            />
            </div>
            <button type="submit">Criar Usuário</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        </div>
      
    </div>
  );
}
