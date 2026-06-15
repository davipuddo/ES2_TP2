import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profissionalService } from '../services/api';

function ProfissionalForm() {
  const [profissional, setProfissional] = useState({ nome: '', telefone: '', endereco: '', categorias: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfissional({ ...profissional, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...profissional,
      categorias: profissional.categorias.split(',').map(c => c.trim()).filter(c => c)
    };
    try {
      await profissionalService.criar(payload);
      navigate('/profissionais');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar profissional');
    }
  };

  return (
    <div>
      <h2>Novo Profissional</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
        <input name="nome" placeholder="Nome" value={profissional.nome} onChange={handleChange} required style={{ padding: '8px' }} />
        <input name="telefone" placeholder="Telefone" value={profissional.telefone} onChange={handleChange} style={{ padding: '8px' }} />
        <input name="endereco" placeholder="Endereço" value={profissional.endereco} onChange={handleChange} style={{ padding: '8px' }} />
        <input name="categorias" placeholder="Categorias (separadas por vírgula)" value={profissional.categorias} onChange={handleChange} style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', border: 'none', cursor: 'pointer' }}>Salvar</button>
      </form>
    </div>
  );
}

export default ProfissionalForm;