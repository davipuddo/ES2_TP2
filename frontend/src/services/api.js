import axios from 'axios';

// Normaliza o host vindo da variável de ambiente para incluir https:// e /api
let host = process.env.REACT_APP_API_URL || 'https://backend-spring-uiem.onrender.com';

// Se o host recebido for apenas o nome interno do Render (ex: backend-spring-xqws)
// e não tiver ponto nem for localhost, adicionamos o sufixo publico do render
if (!host.includes('.') && host !== 'localhost') {
  host = host + '.onrender.com';
}

if (!host.startsWith('http')) {
  host = 'https://' + host;
}
const API_URL = host.endsWith('/api') ? host : host + '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const profissionalService = {
  listar: (params) => api.get('/profissionais', { params }),
  buscar: (id) => api.get(`/profissionais/${id}`),
  criar: (profissional) => api.post('/profissionais', profissional),
  atualizar: (id, profissional) => api.put(`/profissionais/${id}`, profissional),
  deletar: (id) => api.delete(`/profissionais/${id}`)
};

export const atendimentoService = {
  listar: () => api.get('/atendimentos'),
  buscar: (id) => api.get(`/atendimentos/${id}`),
  criar: (atendimento) => api.post('/atendimentos', atendimento),
  atualizar: (id, atendimento) => api.put(`/atendimentos/${id}`, atendimento),
  deletar: (id) => api.delete(`/atendimentos/${id}`)
};

export const exameLabService = {
  listar: () => api.get('/exames'),
  buscar: (id) => api.get(`/exames/${id}`),
  criar: (exame) => api.post('/exames', exame),
  atualizar: (id, exame) => api.put(`/exames/${id}`, exame),
  deletar: (id) => api.delete(`/exames/${id}`)
};

export default api;