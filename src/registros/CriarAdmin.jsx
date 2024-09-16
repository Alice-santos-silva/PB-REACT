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
    <div className="container03">
      <div className='forms'>
        <h2>Criar Novo Admin</h2>
        <form onSubmit={handleCriarUsuario}>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              aria-label="Email"
              style={{color:'black'}}
            />
          </div>
          <div>
            <label htmlFor="senha">Senha:</label>
            <input 
              id="senha"
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
              aria-label="Senha"
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
