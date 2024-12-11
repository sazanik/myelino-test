/* eslint-disable global-require,@typescript-eslint/no-require-imports */
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

import { ROUTE } from '@/constants';
import { ThemeContextProvider, UserContextProvider } from '@/contexts';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // data will be considered fresh within 2 minutes (120 s)
      cacheTime: 5 * 60 * 1000, // stale data will be stored in a cache for 5 minutes (500 s)
      refetchOnReconnect: true, // data refresh when connection is restored
      refetchOnWindowFocus: false, // disable refresh when focusing on a window (optional)
      retry: 1, // repeat request once on error
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000), // Exponential delay between attempts
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
});

const RootLayout = () => {
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    RobotoLight: require('../assets/fonts/Roboto-Light.ttf'),
    RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          <Stack
            initialRouteName={ROUTE.root}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={ROUTE.root} options={{ headerShown: false }} />
            <Stack.Screen name={ROUTE.plan.plans} options={{ headerShown: false }} />
            <Stack.Screen name={ROUTE.plan.details} options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
};

export default RootLayout;
