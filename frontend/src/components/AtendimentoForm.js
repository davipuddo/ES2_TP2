import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { atendimentoService, profissionalService } from '../services/api';

function AtendimentoForm() {
  const [atendimento, setAtendimento] = useState({ data: '', horario: '', problemaTexto: '', receitaSaude: '', profissionalId: '' });
  const [profissionais, setProfissionais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    profissionalService.listar().then(res => setProfissionais(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setAtendimento({ ...atendimento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      data: atendimento.data,
      horario: atendimento.horario ? atendimento.horario + ':00' : null,
      problemaTexto: atendimento.problemaTexto,
      receitaSaude: atendimento.receitaSaude.split(',').map(c => c.trim()).filter(c => c),
      profissional: { id: atendimento.profissionalId }
    };
    try {
      await atendimentoService.criar(payload);
      navigate('/atendimentos');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar atendimento');
    }
  };

  return (
    <div>
      <h2>Novo Atendimento</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
        <input type="date" name="data" value={atendimento.data} onChange={handleChange} required style={{ padding: '8px' }} />
        <input type="time" name="horario" value={atendimento.horario} onChange={handleChange} style={{ padding: '8px' }} />
        <textarea name="problemaTexto" placeholder="Problema / Sintomas" value={atendimento.problemaTexto} onChange={handleChange} style={{ padding: '8px' }}></textarea>
        <input name="receitaSaude" placeholder="Receitas (separadas por vírgula)" value={atendimento.receitaSaude} onChange={handleChange} style={{ padding: '8px' }} />
        <select name="profissionalId" value={atendimento.profissionalId} onChange={handleChange} required style={{ padding: '8px' }}>
          <option value="">Selecione um Profissional</option>
          {profissionais?.map?.(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', border: 'none', cursor: 'pointer' }}>Salvar</button>
      </form>
    </div>
  );
}

export default AtendimentoForm;