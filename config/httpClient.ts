import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance } from 'axios';

const baseURL = `http://${Platform.select({ ios: 'localhost', android: '10.0.2.2' })}:3000`;

const httpClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    const newConfig = config;

    const token = await AsyncStorage.getItem('token');

    if (token) {
      newConfig.headers.authorization = `Bearer ${token}`;
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  async (response) => {
    // add handlers if necessary

    return response;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default httpClient;
