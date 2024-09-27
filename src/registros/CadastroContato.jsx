import React, { useState } from 'react';
import { auth } from '../infra/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CadastroContato = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [error, setErro] = useState(null);
  const [contatos, setContatos] = useState([]);  
  const [showContatos, setShowContatos] = useState(false); 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      console.log('Contato cadastrado', userCredential.user);
      alert('Cadastro de contato efetuado com sucesso');

      setContatos([...contatos, { nome, fornecedor }]);

      setEmail('');
      setSenha('');
      setNome('');
      setTelefone('');
      setFornecedor('');
      setErro(null);
    } catch (error) {
      alert('Erro ao cadastrar contato: ', error);
      setErro(error.message);
    }
  };

  return (
    <div>
      <div className="container03">
        <h1>Cadastro de Contatos</h1>
        <form onSubmit={handleSubmit} className='forms'>
          <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} placeholder='nome' required />
          <input type='text' value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder='telefone' required />
          <input type='text' value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} placeholder='fornecedor' required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail" required />
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" required />
          <button type="submit">Cadastrar</button>
        </form>
        {error && <p>{error}</p>}

        <button onClick={() => setShowContatos(!showContatos)}>
          {showContatos ? 'Esconder Contatos' : 'Visualizar Contatos'}
        </button>

        {showContatos && (
          <div className='listaContatos'>
            <h2>Lista de Contatos</h2>
            <ul>
              {contatos.map((contato, index) => (
                <li key={index}>{contato.fornecedor} - {contato.nome}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CadastroContato;
