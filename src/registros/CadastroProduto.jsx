import React, { useState } from 'react';

const CadastroProduto = ({ addProduto }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoProduto = { id: Date.now(), nome, descricao }; 
    addProduto(novoProduto);
    setNome('');
    setDescricao('');
    alert('Produto cadastrado com sucesso!');
  };

  return (
    <div className="container03">
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit} className='forms'>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Produto"
          required
        />
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroProduto;