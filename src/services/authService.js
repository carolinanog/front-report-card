import api from "../api";


export const login = async (email, senha) => {
  try {
    const response = await api.post('/login', { email, senha });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};