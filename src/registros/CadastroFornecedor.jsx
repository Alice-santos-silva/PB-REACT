import React, { useState } from 'react';
import { auth } from '../infra/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CadastroFornecedor = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setErro] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      console.log('Fornecedor cadastrado', userCredential.user);
      alert('Cadastro efetuado com sucesso');
      setEmail('');
      setSenha('');
      setErro(null);
    } catch (error) {
      alert('Erro ao cadastrar fornecedor: ', error);
      setErro(error.message);
    }
  };

  return (
    <div className="container03">
      <h1>Cadastro de Fornecedores</h1>
      <form onSubmit={handleSubmit} className='forms'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e-mail"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="senha"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CadastroFornecedor;
