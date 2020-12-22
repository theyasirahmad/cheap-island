import axios from 'axios';

export default axios.create({
  baseURL: 'https://grocce.herokuapp.com',
  responseType: 'json',
});
