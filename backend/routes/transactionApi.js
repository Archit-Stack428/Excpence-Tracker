import api from './api.js';

export const fetchTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const addTransaction = async (data) => {
  const response = await api.post('/transactions', data);
  return response.data;
};