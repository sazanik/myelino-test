import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance } from 'axios';

// export interface CustomHeaders extends HeadersDefaults {
//   Authorization?: string | null;
// }

const baseURL = 'http://3.29.235.93:8080';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const newConfig = config;

    const cookies = await AsyncStorage.getItem('cookies');
    if (cookies) {
      newConfig.headers.Cookie = cookies;
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  async (response) => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const cookies = setCookieHeader.map((cookie) => cookie.split(';')[0]).join('; ');
      await AsyncStorage.setItem('cookies', cookies);
    }
    return response;
  },
  (error: AxiosError) => Promise.reject(error)
);
