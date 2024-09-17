import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import AcessoNegado from './pages/AcessoNegado';
import CadastroFornecedor from './registros/CadastroFornecedor';
import CadastroContato from './registros/CadastroContato';
import CadastroProduto from './registros/CadastroProduto';
import CadastroCotacao from './registros/CadastroCotacao';
import CotacaoProduto from './registros/CotacaoProduto';
import PainelAdmin from './registros/PainelAdmin';
import CriarAdmin from './registros/CriarAdmin';
import CriarReq from './registros/CriarReq';
import AlterarReq from './registros/AlterarReq';
import CotacaoMoeda from './infra/CotacaoMoeda';
import React, { useState } from 'react';
import LoginModal from './componentes/LoginModal';  
import './App.css';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const [userRole, setUserRole] = useState(null); 
  const [isLoginModalOpen, setLoginModalOpen] = useState(true);

  const addProduto = (produto) => {
    setProdutos([...produtos, produto]);
  };

  const addCotacao = (cotacao) => {
    setCotacoes([...cotacoes, cotacao]);
  };

  const addRequisicao = (requisicao) => {
    setRequisicoes([...requisicoes, requisicao]);
  };

  const atualizarStatus = (id, novoStatus) => {
    setRequisicoes((prevRequisicoes) =>
      prevRequisicoes.map((req) =>
        req.id === id ? { ...req, status: novoStatus } : req
      )
    );
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="container01">
      <Router>
        <Routes>
          {userRole === 'admin' && (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="painel-admin" element={<PainelAdmin />} />
              <Route path="criar-admin" element={<CriarAdmin />} />
              <Route path="criar-req" element={<CriarReq addRequisicao={addRequisicao} requisicoes={requisicoes} />} />
              <Route path="alterar-req" element={<AlterarReq requisicoes={requisicoes} atualizarStatus={atualizarStatus} />} />
              <Route path="cadastro-fornecedor" element={<CadastroFornecedor />} />
              <Route path="cadastro-contato" element={<CadastroContato />} />
              <Route path="cadastro-produto" element={<CadastroProduto addProduto={addProduto} />} />
              <Route path="cadastro-cotacao" element={<CadastroCotacao produtos={produtos} addCotacao={addCotacao} />} />
              <Route path="consulta-cotacoes" element={<CotacaoProduto produtos={produtos} cotacoes={cotacoes} />} />
              <Route path="consulta-dolar" element={<CotacaoMoeda />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}

          {userRole === 'colaborador' && (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="criar-req" element={<CriarReq addRequisicao={addRequisicao} requisicoes={requisicoes} />} />
              <Route path="cadastro-contato" element={<CadastroContato />} />
              <Route path="consulta-dolar" element={<CotacaoMoeda />} />
              <Route path="*" element={<AcessoNegado />} />
            </Route>
          )}

          {userRole === null && (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>

      <LoginModal 
        open={isLoginModalOpen} 
        handleClose={handleCloseLoginModal} 
        setUserRole={setUserRole} 
      />
    </div>
  );
}
