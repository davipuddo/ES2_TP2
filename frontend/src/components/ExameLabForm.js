import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exameLabService, atendimentoService } from '../services/api';

function ExameLabForm() {
  const [exame, setExame] = useState({ descricao: '', atendimentoId: '' });
  const [atendimentos, setAtendimentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    atendimentoService.listar().then(res => setAtendimentos(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setExame({ ...exame, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      descricao: exame.descricao,
      atendimento: { id: exame.atendimentoId }
    };
    try {
      await exameLabService.criar(payload);
      navigate('/exames');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar exame');
    }
  };

  return (
    <div>
      <h2>Novo Exame Laboratorial</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
        <textarea name="descricao" placeholder="Descrição do Exame" value={exame.descricao} onChange={handleChange} required style={{ padding: '8px' }}></textarea>
        <select name="atendimentoId" value={exame.atendimentoId} onChange={handleChange} required style={{ padding: '8px' }}>
          <option value="">Selecione um Atendimento</option>
          {atendimentos?.map?.(a => (
            <option key={a.id} value={a.id}>Data: {a.data} - Profissional: {a.profissional?.nome}</option>
          ))}
        </select>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', border: 'none', cursor: 'pointer' }}>Salvar</button>
      </form>
    </div>
  );
}

export default ExameLabForm;