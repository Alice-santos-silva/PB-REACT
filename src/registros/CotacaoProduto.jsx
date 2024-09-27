import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const CotacaoProduto = ({ produtos, cotacoes }) => {
  const [produtoId, setProdutoId] = useState('');

  const handleProdutoChange = (event) => {
    setProdutoId(event.target.value);
  };

  const cotacoesFiltradas = cotacoes.filter(cotacao => cotacao.produtoId === produtoId);

  const columns = [
    {
      name: 'Data',
      selector: row => new Date(row.data).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Preço',
      selector: row => (typeof row.preco === 'number' ? `R$ ${row.preco.toFixed(2)}` : 'Preço indisponível'),
      sortable: true,
    }
  ];

  return (
    <div className="container03">
      <h1>Consulta de Cotações por Produto</h1>
      <select
        value={produtoId}
        onChange={handleProdutoChange}
        required
        className='forms'
      >
        <option value="" disabled>
          Selecione um Produto
        </option>
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.nome}
          </option>
        ))}
      </select>

      {produtoId && (
        <div>
          <h2>Cotações para o produto: {produtos.find(p => p.id === Number(produtoId))?.nome}</h2>
          {cotacoesFiltradas.length > 0 ? (
            <div className="custom-table">
              <DataTable
                columns={columns}
                data={cotacoesFiltradas}
                pagination
                highlightOnHover
                striped
              />
            </div>
          ) : (
            <p>Nenhuma cotação encontrada para este produto.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CotacaoProduto;
