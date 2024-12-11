import { Platform } from 'react-native';
import { QueryCache } from 'react-query';

export const BASE_URL = `http://${Platform.select({ ios: 'localhost', android: '10.0.2.2' })}:3000`;

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // data will be considered fresh within 2 minutes (120 s)
      cacheTime: 5 * 60 * 1000, // stale data will be stored in a cache for 5 minutes (500 s)
      refetchOnReconnect: true, // data refresh when connection is restored
      refetchOnWindowFocus: false, // disable refresh when focusing on a window (optional)
      retry: 1, // repeat request once on error
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 3000), // Exponential delay between attempts
    },
    mutations: {
      retry: 1, // Repeat mutation (POST/PUT/DELETE request) once on error
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        console.error('An error occurred while executing the request:', error);
      }
    },
    onSuccess: (data, query) => {
      console.log('Data loaded successfully:', query?.queryKey, data);
    },
  }),
};
