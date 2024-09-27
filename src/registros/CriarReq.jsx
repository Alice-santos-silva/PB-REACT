import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

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

  const columns = [
    { name: 'Produto', selector: row => row.produto, sortable: true },
    { name: 'Quantidade', selector: row => row.quantidade, sortable: true },
    { name: 'Data', selector: row => new Date(row.data).toLocaleDateString(), sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
  ];

  const customStyles = {
    rows: {
      style: {
        color: 'black', 
      },
    },
    header: {
      style: {
        color: 'black', 
      },
    },
  };

  return (
    <div className="container03">
      <h1>Criar Requisição de Compra</h1>
      <form onSubmit={handleSubmit} className="forms">
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
        <button type="button" onClick={toggleRequisicoes}>
          {mostrarRequisicoes ? 'Ocultar Requisições' : 'Listar Requisições'}
        </button>
      </form>

      {mostrarRequisicoes && (
        <div>
          <h2>Lista de Requisições</h2>
          <div className="custom-table">
            <DataTable
              columns={columns}
              data={requisicoes}
              customStyles={customStyles}  
              pagination
              highlightOnHover
              striped
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CriarReq;
