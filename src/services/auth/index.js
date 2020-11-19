import api from '../api';

export async function signIn(email, password) {
  const response = await api.post('/sessions', {email, password});
  return response;
}
