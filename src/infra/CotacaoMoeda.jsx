import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CotacaoMoeda = () => {
  const [cotacao, setCotacao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL')
      .then(response => {
        setCotacao(response.data.USDBRL);
        setCarregando(false);
      })
      .catch(erro => {
        setErro(erro);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro.message}</p>;

  return (
    <div className='container03'>
      <h1>Cotação do Dólar</h1>
      <p>USD/BRL: {cotacao.bid}</p>
      <p>Data: {new Date(cotacao.create_date).toLocaleString()}</p>
    </div>
  );
};

export default CotacaoMoeda;
