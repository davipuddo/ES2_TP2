import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exameLabService } from '../services/api';

function ExameLabList() {
  const [exames, setExames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarExames();
  }, []);

  const carregarExames = async () => {
    try {
      const response = await exameLabService.listar();
      setExames(response.data);
    } catch (error) {
      console.error('Erro ao carregar exames', error);
    }
  };

  const deletar = async (id) => {
    try {
      await exameLabService.deletar(id);
      carregarExames();
    } catch (error) {
      console.error('Erro ao deletar', error);
    }
  };

  return (
    <div>
      <h2>Exames Laboratoriais</h2>
      <button onClick={() => navigate('/exames/novo')} style={{ marginBottom: '15px' }}>Novo Exame</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Atendimento ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {exames?.map?.(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.descricao}</td>
              <td>{e.atendimento?.id}</td>
              <td>
                <button onClick={() => deletar(e.id)} style={{ backgroundColor: 'red' }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExameLabList;