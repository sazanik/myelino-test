/* eslint-disable global-require,@typescript-eslint/no-require-imports */
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { ROUTE } from '@/constants/routes';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
  );
};

export default RootLayout;
