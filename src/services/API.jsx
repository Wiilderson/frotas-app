import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${APIURL}`,
});

export default API;
