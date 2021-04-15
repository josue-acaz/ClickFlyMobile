import api from '../api';

export async function signIn(email, password) {
  const response = await api.post("/customers/authenticate", {email, password});
  return response;
}
