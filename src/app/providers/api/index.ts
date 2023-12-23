import axios from 'axios';
import Config from 'react-native-config';

const unsplashAPI = axios.create({
  baseURL: Config.UNSPLASH_API_BASE,
  timeout: 1000,
  headers: { Authorization: `Client-ID ${Config.ACCESS_KEY}` },
});

export default unsplashAPI;
