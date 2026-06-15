import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { atendimentoService } from '../services/api';

function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAtendimentos();
  }, []);

  const carregarAtendimentos = async () => {
    try {
      const response = await atendimentoService.listar();
      setAtendimentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar atendimentos', error);
    }
  };

  const deletar = async (id) => {
    try {
      await atendimentoService.deletar(id);
      carregarAtendimentos();
    } catch (error) {
      console.error('Erro ao deletar', error);
    }
  };

  return (
    <div>
      <h2>Atendimentos</h2>
      <button onClick={() => navigate('/atendimentos/novo')} style={{ marginBottom: '15px' }}>Novo Atendimento</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Problema</th>
            <th>Receitas</th>
            <th>Profissional</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {atendimentos?.map?.(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.data}</td>
              <td>{a.horario}</td>
              <td>{a.problemaTexto}</td>
              <td>{a.receitaSaude?.join(', ')}</td>
              <td>{a.profissional?.nome}</td>
              <td>
                <button onClick={() => deletar(a.id)} style={{ backgroundColor: 'red' }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AtendimentoList;