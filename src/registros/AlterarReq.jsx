import React from 'react';

const AlterarReq = ({ requisicoes, atualizarStatus }) => {
  const handleStatusChange = (id, novoStatus) => {
    atualizarStatus(id, novoStatus);
  };

  return (
    <div className="container03">
      <h1>Alterar Requisição de Compra</h1>
      <div className='forms'>
      <ul className='list'>
        {requisicoes
          .sort((a, b) => new Date(a.data) - new Date(b.data))
          .map((req) => (
            <li key={req.id}>
              Produto: {req.produto}, Quantidade: {req.quantidade}, Estado: {req.status}, Data: {new Date(req.data).toLocaleDateString()}
              {req.status === 'aberta' && (
                <button onClick={() => handleStatusChange(req.id, 'em cotação')}>Marcar como Em Cotação</button>
              )}
              {req.status === 'em cotação' && (
                <button onClick={() => handleStatusChange(req.id, 'cotada')}>Marcar como Cotada</button>
              )}
            </li>
          ))}
      </ul>
      </div>
     
    </div>
  );
};

export default AlterarReq;
