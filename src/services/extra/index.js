import axios from 'axios';
import {escapeCaracteres} from '../../utils';

export async function consultZipcode(zipcode) {
  const zip = escapeCaracteres(zipcode);
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zip}/json`);
    return response.data;
  } catch (error) {
    return error;
  }
}
