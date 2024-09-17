import React, { useState } from 'react';

const CriarReq = ({ addRequisicao, requisicoes }) => {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaRequisicao = {
      id: requisicoes.length + 1, 
      produto,
      quantidade,
      descricao,
      data: new Date().toISOString(),
      status: 'aberta',
    };
    addRequisicao(novaRequisicao);
    setProduto('');
    setQuantidade('');
    setDescricao('');
  };

  return (
    <div className="container03">
      <h1>Criar Requisição de Compra</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          placeholder="Produto"
          required
        />
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          required
        />
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          required
        />
        <button type="submit">Criar Requisição</button>
      </form>
    </div>
  );
};

export default CriarReq;
