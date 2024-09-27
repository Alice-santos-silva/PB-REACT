import React, { useState } from 'react';

const CadastroCotacao = ({ produtos, addCotacao }) => {
  const [produtoId, setProdutoId] = useState('');
  const [data, setData] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaCotacao = { produtoId, data, preco };
    addCotacao(novaCotacao);
    setProdutoId('');
    setData('');
    setPreco('');
    alert('Cotação cadastrada com sucesso!');
  };

  return (
    <div className="container03">
      <h1>Cadastro de Cotações</h1>
      <form onSubmit={handleSubmit} className='forms'>
        <select
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          required
          className='select'
        >
          <option value="" disabled >
            Selecione um Produto
          </option>
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id} className='select'>
              {produto.nome}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCotacao;