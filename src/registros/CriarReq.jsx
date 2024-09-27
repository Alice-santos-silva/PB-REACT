import React, { useState } from 'react';

const CriarReq = ({ addRequisicao, requisicoes }) => {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState('');
  const [mostrarRequisicoes, setMostrarRequisicoes] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!produto || !quantidade || !data) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaRequisicao = {
      id: requisicoes.length + 1,
      produto,
      quantidade: parseInt(quantidade),
      data: new Date(data).toISOString(),
      status: 'aberta',
    };

    addRequisicao(novaRequisicao);
    setProduto('');
    setQuantidade('');
    setData('');
  };

  const toggleRequisicoes = () => {
    setMostrarRequisicoes(!mostrarRequisicoes); 
  };

  return (
    <div className="container02">
      <h1>Criar Requisição de Compra</h1>
      <form onSubmit={handleSubmit} className='forms'>
        <div>
          <label>Produto:</label>
          <input
            type="text"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            placeholder="Nome do produto"
            required
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade"
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Requisição</button>
        <button onClick={toggleRequisicoes}>
        {mostrarRequisicoes ? 'Ocultar Requisições' : 'Listar Requisições'}
      </button>
      </form>

     

      {mostrarRequisicoes && (
        <div>
          <h2>Lista de Requisições</h2>
          <ul>
            {requisicoes.map((req) => (
              <li key={req.id}>
                {req.produto} - {req.quantidade} unidades - {new Date(req.data).toLocaleDateString()} - Status: {req.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CriarReq;
