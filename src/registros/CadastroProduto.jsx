import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const CadastroProduto = ({ addProduto, requisicoes }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mostrarPendentes, setMostrarPendentes] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoProduto = { id: Date.now(), nome, descricao };
    addProduto(novoProduto);
    setNome('');
    setDescricao('');
    alert('Produto cadastrado com sucesso!');
  };

  const togglePendentes = () => {
    setMostrarPendentes(!mostrarPendentes);
  };

  const columns = [
    { name: 'Produto', selector: row => row.produto, sortable: true },
    { name: 'Quantidade', selector: row => row.quantidade, sortable: true },
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
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit} className="forms">
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

      <button onClick={togglePendentes} className='botao'>
        {mostrarPendentes ? 'Ocultar Pendentes' : 'Cadastros a Fazer'}
      </button>

      {mostrarPendentes && (
        <div>
          <h2>Requisições Pendentes</h2>
          <div className="custom-table">
            <DataTable
              columns={columns}
              data={requisicoes.filter(req => req.status === 'aberta')}
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

export default CadastroProduto;
