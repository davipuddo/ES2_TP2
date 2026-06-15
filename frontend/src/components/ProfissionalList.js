import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profissionalService } from '../services/api';

function ProfissionalList() {
  const [profissionais, setProfissionais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarProfissionais();
  }, []);

  const carregarProfissionais = async () => {
    try {
      const response = await profissionalService.listar();
      setProfissionais(response.data);
    } catch (error) {
      console.error('Erro ao carregar profissionais', error);
    }
  };

  const deletar = async (id) => {
    try {
      await profissionalService.deletar(id);
      carregarProfissionais();
    } catch (error) {
      console.error('Erro ao deletar', error);
    }
  };

  return (
    <div>
      <h2>Profissionais de Saúde</h2>
      <button onClick={() => navigate('/profissionais/novo')} style={{ marginBottom: '15px' }}>Novo Profissional</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Categorias</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {profissionais.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.telefone}</td>
              <td>{p.endereco}</td>
              <td>{p.categorias?.join(', ')}</td>
              <td>
                <button onClick={() => deletar(p.id)} style={{ backgroundColor: 'red' }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfissionalList;